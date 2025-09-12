'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Upload } from 'lucide-react';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import useFileUpload from '@/hooks/useFileUpload';

const CSVUpload = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const {
    uploading,
    uploadedFiles,
    loading,
    fileInputRef,
    deletingFileId,
    deleteFile,
    handleFileUpload,
    fetchUploadedFiles,
  } = useFileUpload();

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      const csvFiles = Array.from(e.dataTransfer.files).filter(
        (file) => file.name.endsWith('.csv') || file.type === 'text/csv'
      );
      if (csvFiles.length === 0) return alert('Please upload only CSV files');
      handleFileUpload(csvFiles);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) fetchUploadedFiles();
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) return <div className="flex justify-center p-4">Loading...</div>;

  return (
    <div className="mx-auto mt-20 max-w-2xl rounded-xl p-6 dark:bg-gray-900 dark:text-gray-100">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold">Upload CSV Files</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome, {user.firstName}! Upload CSV files to get started.
        </p>
      </div>

      <div
        className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${dragActive ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500'} ${uploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} `}
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
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
          disabled={uploading}
        />
        <div className="space-y-4">
          <Upload className="mx-auto text-gray-700 dark:text-gray-300" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
            {uploading ? 'Uploading...' : 'Drop CSV files here or click to browse'}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Supports multiple file uploads • CSV files only
          </p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {uploading ? 'Uploading...' : 'Select Files'}
        </Button>
      </div>

      {loading && <Loading text="Loading uploaded files..." />}
      {!loading && uploadedFiles.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Uploaded Files ({uploadedFiles.length})</h3>
            <button
              onClick={fetchUploadedFiles}
              className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              disabled={loading}
            >
              Refresh
            </button>
          </div>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={file.fileId || file.$id || index}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <div>
                    <p className="font-medium">
                      {file.originalName || file.fileName || `File ${index + 1}`}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {file.fileSize ? `${(file.fileSize / 1024).toFixed(1)} KB` : 'Unknown size'} •{' '}
                      {file.uploadedAt || file.$createdAt
                        ? new Date(file.uploadedAt || file.$createdAt).toLocaleDateString()
                        : 'Just now'}
                    </p>
                  </div>
                </div>
                <div>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                    View
                  </Button>
                  <Button
                    className="ml-2 bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                    disabled={deletingFileId === file.fileId || deletingFileId === file.$id}
                    onClick={() => deleteFile(file.fileId || file.$id)}
                  >
                    {deletingFileId === (file.fileId || file.$id) ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && uploadedFiles.length === 0 && (
        <p className="mt-8 text-center text-gray-500 dark:text-gray-400">
          No files uploaded yet. Upload your first CSV file to get started!
        </p>
      )}
    </div>
  );
};

export default CSVUpload;
