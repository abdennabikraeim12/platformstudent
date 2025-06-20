"use client"

import React, { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import apiService from '@/app/services/api';
import { StudentCard } from '@/app/components/students/studentCard';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { Student } from '@/app/types';

export default function StudentProfilePage() {
  const params = useParams(); 
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    return <div className="p-4">Loading student profile...</div>;
  }

  if (!student) {
    notFound();
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <StudentCard student={student} />
      <div className="mt-4 flex justify-between">
        <Button asChild variant="outline">
          <Link href="/students" style={{backgroundColor:"#edefeb"}}>Back to Students</Link>
        </Button>
        <Button asChild>
          <Link href={`/students/${student.id}/edit`} style={{backgroundColor:"#ccf9a9"}}>Edit Profile</Link>
        </Button>
      </div>
    </div>
  );
}