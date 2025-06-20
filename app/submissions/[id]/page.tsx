import React from 'react';
import { notFound } from 'next/navigation';
import apiService from '@/app/services/api';
import SubmissionCard from '@/app/components/submissions/SubmissionCard';

const SubmissionDetailPage = async ({ params }: { params: { id: string } }) => {
  try {
    const submission = await apiService.getSubmission(params.id);
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <SubmissionCard submission={submission} detailed />
        </div>
      </div>
    );
  } catch (error) {
    console.log(error)
    return notFound();
  }
};

export default SubmissionDetailPage;