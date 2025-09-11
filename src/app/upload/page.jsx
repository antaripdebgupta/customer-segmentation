'use client';

import { useState, useRef, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

const CSVUpload = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Upload failed');
        }

        return result.data;
      });

      const results = await Promise.all(uploadPromises);

      setUploadedFiles((prev) => [...prev, ...results]);

      alert(`Successfully uploaded ${results.length} file(s)`);
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const csvFiles = Array.from(e.dataTransfer.files).filter(
        (file) => file.name.endsWith('.csv') || file.type === 'text/csv'
      );

      if (csvFiles.length === 0) {
        alert('Please upload only CSV files');
        return;
      }

      handleFileUpload(csvFiles);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files) {
      handleFileUpload(e.target.files);
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/upload');
      const result = await response.json();

      if (response.ok) {
        setUploadedFiles(result.files || []);
      } else {
        console.error('Failed to fetch files:', result.error);
      }
    } catch (error) {
      console.error('Failed to fetch files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchUploadedFiles();
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return <div className="flex justify-center p-4">Loading...</div>;
  }

  return (
    <div className="mx-auto mt-20 max-w-2xl p-6">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold">Upload CSV Files</h2>
        <p className="text-gray-600">Welcome, {user.firstName}! Upload CSV files to get started.</p>
      </div>

      <div
        className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".csv,text/csv"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={uploading}
        />

        <div className="space-y-4">
          <div className="flex justify-center text-center">
            <Upload className="" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              {uploading ? 'Uploading...' : 'Drop CSV files here or click to browse'}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Supports multiple file uploads • CSV files only
            </p>
          </div>

          {uploading && (
            <div className="flex justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Select Files'}
        </button>
      </div>

      {loading && <Loading text="Loading uploaded files..." />}

      {!loading && uploadedFiles.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Uploaded Files ({uploadedFiles.length})</h3>
            <button
              onClick={fetchUploadedFiles}
              className="text-sm text-blue-500 hover:text-blue-600"
              disabled={loading}
            >
              Refresh
            </button>
          </div>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={file.fileId || file.$id || index}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-green-500">✓</div>
                  <div>
                    <p className="font-medium">
                      {file.originalName || file.fileName || `File ${index + 1}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {file.fileSize ? `${(file.fileSize / 1024).toFixed(1)} KB` : 'Unknown size'} •{' '}
                      {file.uploadedAt || file.$createdAt
                        ? new Date(file.uploadedAt || file.$createdAt).toLocaleDateString()
                        : 'Just now'}
                    </p>
                  </div>
                </div>
                <div>
                  <Button className="bg-blue-600 font-semibold text-white">View</Button>
                  <Button className="ml-2 bg-red-600 font-semibold text-white">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && uploadedFiles.length === 0 && (
        <div className="mt-8 text-center text-gray-500">
          <p>No files uploaded yet. Upload your first CSV file to get started!</p>
        </div>
      )}
    </div>
  );
};

export default CSVUpload;
