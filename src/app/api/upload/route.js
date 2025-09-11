import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { Client, Databases, Storage, ID, Permission, Role, Query } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

async function retryOperation(operation, maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      console.log(`Attempt ${attempt} failed:`, error.message);

      if (attempt === maxRetries) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }
}

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
      return NextResponse.json({ error: 'Only CSV files are allowed' }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 413 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileId = ID.unique();
    const fileName = `${userId}_${Date.now()}_${file.name}`;

    console.log(`Attempting to upload file: ${fileName} (${file.size} bytes)`);

    const uploadedFile = await retryOperation(
      async () => {
        return await storage.createFile(
          process.env.APPWRITE_BUCKET_ID,
          fileId,
          InputFile.fromBuffer(buffer, fileName),
          [Permission.read(Role.user(userId)), Permission.write(Role.user(userId))]
        );
      },
      3,
      2000
    );

    console.log('File uploaded successfully:', uploadedFile.$id);

    const fileDocument = await retryOperation(
      async () => {
        return await databases.createDocument(
          process.env.APPWRITE_DATABASE_ID,
          process.env.APPWRITE_COLLECTION_ID,
          ID.unique(),
          {
            userId: userId,
            fileId: uploadedFile.$id,
            fileName: fileName,
            originalName: file.name,
            fileSize: file.size,
            fileType: file.type || 'text/csv',
            uploadedAt: new Date().toISOString(),
            status: 'uploaded',
          }
        );
      },
      3,
      1000
    );

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        fileId: uploadedFile.$id,
        documentId: fileDocument.$id,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: fileDocument.uploadedAt,
      },
    });
  } catch (error) {
    console.error('Upload error details:', {
      message: error.message,
      code: error.code,
      type: error.type,
      response: error.response,
    });

    if (error.code === 503) {
      return NextResponse.json(
        {
          error: 'Service temporarily unavailable. Please try again in a few moments.',
        },
        { status: 503 }
      );
    }

    if (error.code === 413) {
      return NextResponse.json({ error: 'File too large' }, { status: 413 });
    }

    if (error.code === 400) {
      if (error.type === 'document_invalid_structure') {
        return NextResponse.json(
          {
            error:
              'Database schema error. Please ensure all collection attributes are properly configured.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined,
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          error: 'Invalid file or request. Please check your file and try again.',
        },
        { status: 400 }
      );
    }

    if (error.message.includes('fetch') || error.message.includes('network')) {
      return NextResponse.json(
        {
          error: 'Network error. Please check your connection and try again.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        error: 'Upload failed. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const files = await retryOperation(
      async () => {
        return await databases.listDocuments(
          process.env.APPWRITE_DATABASE_ID,
          process.env.APPWRITE_COLLECTION_ID,
          [Query.equal('userId', userId), Query.orderDesc('uploadedAt')]
        );
      },
      2,
      1000
    );

    return NextResponse.json({
      success: true,
      files: files.documents,
    });
  } catch (error) {
    console.error('Fetch files error:', error);

    if (error.code === 503) {
      return NextResponse.json(
        {
          error: 'Service temporarily unavailable. Please try again.',
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to fetch files. Please try again later.',
      },
      { status: 500 }
    );
  }
}
