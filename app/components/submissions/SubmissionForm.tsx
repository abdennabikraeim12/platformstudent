"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateSubmissionDto, UpdateSubmissionDto } from '@/app/types';
import apiService from '@/app/services/api';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

const createSubmissionSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  assignmentId: z.number().min(1, 'Assignment ID is required'),
  studentId: z.number().min(1, 'Student ID is required'),
  grade: z.number().min(0).max(100).nullable().optional(),
  feedback: z.string().nullable().optional(),
});

const updateSubmissionSchema = createSubmissionSchema;

interface SubmissionFormProps {
  initialData?: UpdateSubmissionDto & { id?: string };
  assignmentId?: string;
  studentId?: string;
  isEdit?: boolean;
}

const SubmissionForm = ({ 
  initialData, 
  assignmentId,
  studentId,
  isEdit = false 
}: SubmissionFormProps) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(isEdit ? updateSubmissionSchema : createSubmissionSchema),
    defaultValues: initialData || {
      content: '',
      assignmentId: assignmentId ? parseInt(assignmentId) : undefined,
      studentId: studentId ? parseInt(studentId) : undefined,
      grade: null,
      feedback: null,
    },
  });

  const onSubmit = async (data: CreateSubmissionDto | UpdateSubmissionDto) => {
    try {
      if (isEdit && initialData?.id) {
        const updateData = {
          content: data.content,
          grade: data.grade,
          feedback: data.feedback
        };
        await apiService.updateSubmission(initialData.id, updateData);
       
      } else {
        const createData = {
          content: data.content,
          assignmentId: data.assignmentId,
          studentId: data.studentId,
          grade: data.grade,
          feedback: data.feedback
        };
        await apiService.createSubmission(createData);
       
      }
      router.push('/submissions');
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {!isEdit && (
          <>
            <FormField
              control={form.control}
              name="assignmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignment ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter assignment ID"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      disabled={!!assignmentId}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter student ID"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      disabled={!!studentId}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your submission content"
                  className="min-h-[100px] "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter grade (0-100)"
                  min={0}
                  max={100}
                  value={field.value ?? ''}
                  onChange={(e) => 
                    field.onChange(e.target.value === '' ? null : Number(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter feedback"
                  className="min-h-[80px]"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/submissions')}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEdit ? 'Update Submission' : 'Create Submission'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SubmissionForm;