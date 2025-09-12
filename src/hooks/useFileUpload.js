import { useState, useRef } from 'react';

export default function useFileUpload(fetchUrl = '/api/upload') {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingFileId, setDeletingFileId] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(fetchUrl, { method: 'POST', body: formData });
        const result = await response.json();

        if (!response.ok) throw new Error(result.error || 'Upload failed');
        return result.data;
      });

      const results = await Promise.all(uploadPromises);
      setUploadedFiles((prev) => [...prev, ...results]);
      return { success: true, count: results.length };
    } catch (error) {
      console.error('Upload error:', error);
      return { success: false, message: error.message };
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch(fetchUrl);
      const result = await response.json();

      if (response.ok) setUploadedFiles(result.files || []);
      else console.error('Failed to fetch files:', result.error);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (fileId) => {
    if (!fileId) return;
    const confirmDelete = window.confirm('Are you sure you want to delete this file?');
    if (!confirmDelete) return;

    try {
      setDeletingFileId(fileId);

      const response = await fetch(`${fetchUrl}?id=${fileId}`, { method: 'DELETE' });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Delete failed');

      setUploadedFiles((prev) =>
        prev.filter((file) => file.fileId !== fileId && file.$id !== fileId)
      );
      return { success: true };
    } catch (error) {
      console.error('Delete error:', error);
      return { success: false, message: error.message };
    } finally {
      setDeletingFileId(null);
    }
  };

  return {
    uploading,
    uploadedFiles,
    loading,
    deletingFileId,
    fileInputRef,
    handleFileUpload,
    fetchUploadedFiles,
    deleteFile,
    setUploadedFiles,
  };
}
