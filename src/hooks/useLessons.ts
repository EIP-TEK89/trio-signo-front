import { useState, useEffect, useCallback } from 'react';
import { fetchAllLessons, fetchLessonById } from '$services/lessonServices';

// Define a Lesson type based on the API response example
export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  exercises: any[];
}

interface UseLessonsResult {
  lessons: Lesson[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface UseLessonResult {
  lesson: Lesson | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useLessons = (): UseLessonsResult => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLessons = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAllLessons();
      setLessons(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch lessons'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  return { lessons, loading, error, refetch: fetchLessons };
};

export const useLesson = (id: string): UseLessonResult => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLesson = useCallback(async () => {
    if (!id) {
      setLesson(null);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await fetchLessonById(id);
      setLesson(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch lesson'));
      setLesson(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLesson();
  }, [fetchLesson]);

  return { lesson, loading, error, refetch: fetchLesson };
};
