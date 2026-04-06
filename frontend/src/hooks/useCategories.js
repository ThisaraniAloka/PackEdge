import { useState, useCallback } from 'react';
import { categoryService } from '../services/categoryService';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await categoryService.getAll();
      setCategories(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { categories, loading, error, fetchCategories };
};
