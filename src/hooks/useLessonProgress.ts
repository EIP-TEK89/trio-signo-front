import { useState, useEffect, useCallback } from 'react';
import {
  fetchAllLessonProgress,
  fetchLessonProgressById,
  startLesson,
  updateLessonProgress,
  completeLesson,
  resetLessonProgress,
} from '$services/lessonProgressServices';

// Types based on API response
export interface LessonProgress {
  id: string;
  title: string;
  description: string;
  level: string;
  isPublished: boolean;
  progress: {
    completed: boolean;
    currentStep: number;
    score: number | null;
  };
}

export interface LessonProgressDetail {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  currentStep: number;
  score: number;
  updatedAt: string;
}

export const useAllLessonProgress = () => {
  const [progressList, setProgressList] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAllLessonProgress();
      setProgressList(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch lesson progress'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return { progressList, loading, error, refetch: fetchProgress };
};

export const useLessonProgress = (lessonId: string) => {
  const [progress, setProgress] = useState<LessonProgressDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!lessonId) {
      setProgress(null);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await fetchLessonProgressById(lessonId);
      setProgress(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch lesson progress'));
      setProgress(null);
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Actions
  const start = useCallback(() => startLesson(lessonId), [lessonId]);
  const update = useCallback((data: { currentStep: number; completed: boolean }) => updateLessonProgress(lessonId, data), [lessonId]);
  const complete = useCallback(() => completeLesson(lessonId), [lessonId]);
  const reset = useCallback(() => resetLessonProgress(lessonId), [lessonId]);

  return {
    progress,
    loading,
    error,
    refetch: fetchProgress,
    start,
    update,
    complete,
    reset,
  };
};
