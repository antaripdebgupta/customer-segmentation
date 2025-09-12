import { useState, useRef } from 'react';
import { toast } from 'sonner';
import ConfirmToast from '@/components/ConfirmToast';

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

      toast.success(`${results.length} file uploaded successfully`);
      return { success: true, count: results.length };
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Upload failed. Please try again.');
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

      if (response.ok) {
        setUploadedFiles(result.files || []);
      } else {
        console.error('Failed to fetch files:', result.error);
        toast.error(result.error || 'Failed to fetch files');
      }
    } catch (error) {
      console.error('Failed to fetch files:', error);
      toast.error('Unable to load uploaded files.');
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = (fileId, fileName) => {
    if (!fileId) return;
    ConfirmToast({
      message: `Are you sure you want to delete "${fileName || 'this file'}"?`,
      confirmLabel: 'Yes, Delete',
      cancelLabel: 'Cancel',
      onConfirm: () => performDelete(fileId),
    });
  };

  const performDelete = async (fileId) => {
    try {
      setDeletingFileId(fileId);

      const response = await fetch(`${fetchUrl}?id=${fileId}`, { method: 'DELETE' });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Delete failed');

      setUploadedFiles((prev) =>
        prev.filter((file) => file.fileId !== fileId && file.$id !== fileId)
      );
      toast.success('File deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Delete failed');
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
