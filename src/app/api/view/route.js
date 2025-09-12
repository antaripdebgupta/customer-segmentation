import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { Client, Storage } from 'node-appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const storage = new Storage(client);

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('id');
    if (!fileId) {
      return NextResponse.json({ error: 'Missing fileId' }, { status: 400 });
    }

    //console.log(`Requested fileId: ${fileId} by user: ${userId}`);

    // Get file as Buffer/ArrayBuffer
    const fileBuffer = await storage.getFileView(process.env.APPWRITE_BUCKET_ID, fileId);

    if (!fileBuffer) {
      console.error('Empty response from Appwrite');
      return NextResponse.json({ error: 'File not found or empty' }, { status: 404 });
    }

    let fileContent;
    if (fileBuffer instanceof ArrayBuffer) {
      const decoder = new TextDecoder('utf-8');
      fileContent = decoder.decode(fileBuffer);
    } else if (Buffer.isBuffer(fileBuffer)) {
      fileContent = fileBuffer.toString('utf-8');
    } else {
      console.error('Unexpected file type:', typeof fileBuffer);
      return NextResponse.json({ error: 'Invalid file format' }, { status: 500 });
    }

    //console.log('First 500 chars of file:', fileContent.slice(0, 500));

    return new Response(fileContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'inline', // Prevent download
      },
    });
  } catch (error) {
    console.error('File view error:', error);
    return NextResponse.json(
      { error: 'Unable to fetch file content', details: error.message },
      { status: 500 }
    );
  }
}
