import SubmissionForm from '@/app/components/submissions/SubmissionForm';
import { SearchParams } from 'next/dist/server/request/search-params';
import React from 'react';


const CreateSubmissionPage = ({ searchParams }: { searchParams: SearchParams }) => {
  const assignmentId = searchParams.assignmentId as string;

  return (
    <div className="container mx-auto px-80 py-8 mb-4 " style={{backgroundColor:"white",}}>
      <h1 className="text-2xl font-bold mb-6">Create Submission</h1>
      <SubmissionForm assignmentId={assignmentId} />
    </div>
  );
};

export default CreateSubmissionPage;