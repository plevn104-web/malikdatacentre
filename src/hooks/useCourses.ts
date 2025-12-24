import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration_weeks: number;
  price_pkr: number;
  features: string[];
  is_bundle: boolean;
  is_active: boolean;
  display_order: number;
}

export interface CourseEnrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  enrolled_at: string | null;
  completed_at: string | null;
  progress: number;
  course?: Course;
}

const USD_RATE = 278;

const parseFeatures = (features: Json | null): string[] => {
  if (!features) return [];
  if (Array.isArray(features)) {
    return features.map(f => String(f));
  }
  return [];
};

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;

      const coursesData: Course[] = (data || []).map(course => ({
        id: course.id,
        title: course.title,
        slug: course.slug,
        description: course.description,
        duration_weeks: course.duration_weeks,
        price_pkr: Number(course.price_pkr),
        features: parseFeatures(course.features),
        is_bundle: course.is_bundle || false,
        is_active: course.is_active || true,
        display_order: course.display_order
      }));

      setCourses(coursesData);
    } catch (err: any) {
      console.error('Error fetching courses:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPKR = (amount: number) => `PKR ${amount.toLocaleString()}`;
  const formatUSD = (pkrAmount: number) => `$${Math.round(pkrAmount / USD_RATE)}`;

  return { courses, isLoading, error, formatPKR, formatUSD, refetch: fetchCourses };
}

export function useUserEnrollments(userId: string | undefined) {
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchEnrollments();
    } else {
      setEnrollments([]);
      setIsLoading(false);
    }
  }, [userId]);

  const fetchEnrollments = async () => {
    if (!userId) return;

    try {
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from('course_enrollments')
        .select('*')
        .eq('user_id', userId);

      if (enrollmentError) throw enrollmentError;

      if (!enrollmentData || enrollmentData.length === 0) {
        setEnrollments([]);
        setIsLoading(false);
        return;
      }

      // Fetch course details for each enrollment
      const courseIds = enrollmentData.map(e => e.course_id);
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .in('id', courseIds);

      if (coursesError) throw coursesError;

      const coursesMap = (coursesData || []).reduce((acc, course) => {
        acc[course.id] = {
          id: course.id,
          title: course.title,
          slug: course.slug,
          description: course.description,
          duration_weeks: course.duration_weeks,
          price_pkr: Number(course.price_pkr),
          features: parseFeatures(course.features),
          is_bundle: course.is_bundle || false,
          is_active: course.is_active || true,
          display_order: course.display_order
        };
        return acc;
      }, {} as Record<string, Course>);

      const enrichedEnrollments = enrollmentData.map(enrollment => ({
        ...enrollment,
        course: coursesMap[enrollment.course_id]
      }));

      setEnrollments(enrichedEnrollments as CourseEnrollment[]);
    } catch (err: any) {
      console.error('Error fetching enrollments:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { enrollments, isLoading, error, refetch: fetchEnrollments };
}