import { useState, useEffect, useCallback } from 'react';
import {
  fetchExercisesByLessonId,
  fetchExerciseById,
  checkExerciseAnswer,
} from '$services/exercicesServices';

// Types based on API response
export interface Exercise {
  id: string;
  lessonId: string;
  prompt: string;
  signId: string;
  type: string;
  options?: string[];
  sign?: any;
}

export interface ExerciseCheckResult {
  isCorrect: boolean;
  score: number;
  correctAnswer: string;
  exerciseType: string;
  feedback: string;
}

export const useExercisesByLesson = (lessonId: string) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchExercises = useCallback(async () => {
    if (!lessonId) {
      setExercises([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await fetchExercisesByLessonId(lessonId);
      setExercises(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch exercises'));
      setExercises([]);
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  return { exercises, loading, error, refetch: fetchExercises };
};

export const useExercise = (id: string) => {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchExercise = useCallback(async () => {
    if (!id) {
      setExercise(null);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await fetchExerciseById(id);
      setExercise(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch exercise'));
      setExercise(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchExercise();
  }, [fetchExercise]);

  return { exercise, loading, error, refetch: fetchExercise };
};

export const useCheckExerciseAnswer = () => {
  const [result, setResult] = useState<ExerciseCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const checkAnswer = useCallback(async (id: string, answer: string, multipleChoice: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const data = await checkExerciseAnswer(id, answer, multipleChoice);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to check answer'));
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, error, checkAnswer };
};
