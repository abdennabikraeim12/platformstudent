'use client';

import React, { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import apiService from '@/app/services/api';
import SubmissionForm from '@/app/components/submissions/SubmissionForm';

const EditSubmissionPage = () => {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const data = await apiService.getSubmission(id);
        setSubmission(data);
      } catch (error) {
        console.error(error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubmission();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!submission) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Submission</h1>
      <SubmissionForm 
        initialData={{
          id: submission.id,
          content: submission.content,
          grade: submission.grade,
          feedback: submission.feedback
        }} 
        assignmentId={submission.assignmentId.toString()}
        isEdit
      />
    </div>
  );
};

export default EditSubmissionPage;