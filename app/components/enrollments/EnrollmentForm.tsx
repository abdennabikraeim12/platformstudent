"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useRouter } from 'next/navigation';
import apiService from '@/app/services/api';
import React from 'react';

const enrollmentSchema = z.object({
  studentId: z.number().min(1, 'Student is required'),
  courseId: z.number().min(1, 'Course is required'),
});

interface EnrollmentFormProps {
  initialData?: {
    studentId: number;
    courseId: number;
  };
  courseId?: number;
  isEdit?: boolean;
}

export const EnrollmentForm = ({ 
  initialData, 
  courseId,
  isEdit = false 
}: EnrollmentFormProps) => {
  const router = useRouter();
  const [students, setStudents] = React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, coursesRes] = await Promise.all([
          apiService.getStudents(),
          apiService.getCourses()
        ]);
        setStudents(studentsRes);
        setCourses(coursesRes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const form = useForm({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: initialData || {
      studentId: undefined,
      courseId: courseId ? parseInt(courseId) : undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof enrollmentSchema>) => {
    try {
      setLoading(true);
      if (isEdit && initialData) {
        // Update logic would go here if needed
      } else {
        await apiService.enrollStudent(data.courseId, { studentId: data.studentId });
      }
      router.push(`/courses/${data.courseId}/enrollments`);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {!courseId && (
          <FormField
            control={form.control}
            name="courseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student</FormLabel>
              <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(courseId ? `/courses/${courseId}/enrollments` : '/courses')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Processing...' : isEdit ? 'Update Enrollment' : 'Create Enrollment'}
          </Button>
        </div>
      </form>
    </Form>
  );
};