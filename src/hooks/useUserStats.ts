import { useState, useEffect } from 'react';
import axios from 'axios';
import { getBaseUrl } from '$utils/getBaseUrl';

interface UserStats {
  streak: number;
  gems: number;
  hearts: number;
}

export const useUserStats = () => {
  const [stats, setStats] = useState<UserStats>({
    streak: 0,
    gems: 0,
    hearts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/user/stats`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setStats(response.data);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching user stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}; 