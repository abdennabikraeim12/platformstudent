"use client"

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import apiService from '@/app/services/api';
import { Student } from '@/app/types';
import { UpdateStudentForm } from '@/app/components/students/updateStudentForm';

export default function EditStudentPage() {
  const params = useParams();
  const [student, setStudent] = React.useState<Student | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadStudent = async () => {
      try {
        const data = await apiService.getStudent(params.id as string);
        setStudent(data);
      } catch (error) {
        console.log('Error loading student:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      loadStudent();
    }
  }, [params.id]);

  if (isLoading) {
    return <div className="p-4">Loading student data...</div>;
  }

  if (!student) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <UpdateStudentForm student={student} />
    </div>
  );
}