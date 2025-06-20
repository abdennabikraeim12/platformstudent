"use client";

import { EnrollmentForm } from '@/app/components/enrollments/EnrollmentForm';

export default function NewEnrollmentPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Enroll New Student</h1>
      <EnrollmentForm courseId={params.id} />
    </div>
  );
}