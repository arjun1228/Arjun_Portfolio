import { useState, useEffect, useCallback } from 'react';
import { fallbackData } from '../data/fallbackData.js';

export const useFetch = (fetchFunction, fallbackKey, autoFetch = true) => {
  const [data, setData] = useState(() => fallbackData[fallbackKey] || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(true);

  const executeFetch = useCallback(async () => {
    try {
      const response = await fetchFunction();
      if (response && response.success && response.data !== null && response.data !== undefined) {
        // If data is empty array, keep fallbackData
        if (Array.isArray(response.data) && response.data.length === 0) {
          setData(fallbackData[fallbackKey] || []);
          setIsFallback(true);
        } else {
          setData(response.data);
          setIsFallback(false);
        }
      } else {
        // Quietly fallback
        setData(fallbackData[fallbackKey] || null);
        setIsFallback(true);
      }
    } catch {
      // Quiet fallback without noisy console errors
      setData(fallbackData[fallbackKey] || null);
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, fallbackKey]);

  useEffect(() => {
    if (autoFetch) {
      executeFetch();
    }
  }, [autoFetch, executeFetch]);

  return { data, loading, error, isFallback, refetch: executeFetch, setData };
};
