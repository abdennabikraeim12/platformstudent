import React from 'react';

import Link from 'next/link';
import { Button } from '../components/ui/button';
import SubmissionList from '../components/submissions/submissionList';

const SubmissionsPage = async () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Submissions</h1>
        <Link href="/submissions/create">
          <Button>Create Submission</Button>
        </Link>
      </div>
      <SubmissionList />
    </div>
  );
};

export default SubmissionsPage;