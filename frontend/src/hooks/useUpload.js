import { useState, useCallback } from 'react';
import { uploadService } from '../services/uploadService';

export const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const uploadFile = useCallback(async (file) => {
    setLoading(true);
    try {
      const res = await uploadService.uploadFile(file);
      setFileUrl(res.data.url);
      return res.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, fileUrl, uploadFile };
};
