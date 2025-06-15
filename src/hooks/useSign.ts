import { useState, useEffect } from 'react';
import signService, { Sign } from '$services/signService';

interface UseSignsResult {
  signs: Sign[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface UseSignResult {
  sign: Sign[] | null;
  loading: boolean;
  error: Error | null;
}

export const useSigns = (): UseSignsResult => {
  const [signs, setSigns] = useState<Sign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSigns = async () => {
    try {
      setLoading(true);
      const data = await signService.getAllSigns();
      setSigns(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch signs'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSigns();
  }, []);

  return { signs, loading, error, refetch: fetchSigns };
};

export const useSignByWord = (word: string): UseSignResult => {
  const [sign, setSign] = useState<Sign[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSign = async () => {
      if (!word) {
        setSign(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await signService.searchSignByName(word);
        setSign(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch sign'));
        setSign(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSign();
  }, [word]);

  return { sign, loading, error };
};