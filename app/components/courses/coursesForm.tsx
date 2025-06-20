"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import apiService from '@/app/services/api';
import { CreateCourseDto } from '@/app/types';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { useAuth } from '@/app/context/authContext';

export function CourseForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateCourseDto>({
    title: '',
    description: '',
    teacherId: user?.id || '', 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Please enter a course title");
      return;
    }

    if (!user) {
      toast.error("Please login first");
      router.push('/login');
      return;
    }

    setIsLoading(true);

    try {
      const newCourse = await apiService.createCourse({
        ...formData,
        teacherId: user.id 
      });
      
      toast.success("Course created successfully");
      router.push(`/courses/${newCourse.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create course");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle >Create New Course</CardTitle>
        <CardDescription>Add a new course to your platform</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Course Title
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Introduction to Web Development"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter course description..."
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading} style={{backgroundColor:"#ddf6b8"}}>
            {isLoading ? 'Creating...' : 'Create Course'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default CourseForm;