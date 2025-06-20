"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import SubmissionCard from './SubmissionCard';
import apiService from '@/app/services/api';

const SubmissionList = () => {
  const [submissions, setSubmissions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await apiService.getSubmissions();
        setSubmissions(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const handleUpdate = async (submissionId: number, updatedData: {
    content?: string;
    grade?: number;
    feedback?: string;
  }) => {
    try {
      const updatedSubmission = await apiService.updateSubmission(
        `${submissionId}`, 
        updatedData
      );
      
      setSubmissions(prev => prev.map(sub => 
        sub.id === submissionId ? updatedSubmission : sub
      ));
      
      return updatedSubmission;
    } catch (error) {
      console.error('Failed to update submission:', error);
      throw error; 
    }
  };

  const handleDelete = async (submissionId: number) => {
    try {
      await apiService.deleteSubmission(`${submissionId}`);
      setSubmissions(prev => prev.filter(sub => sub.id !== submissionId));
    } catch (error) {
      console.error('Failed to delete submission:', error);
      throw error;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading submissions</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Submissions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {submissions.length > 0 ? (
          submissions.map((submission) => (
            <SubmissionCard 
              key={submission.id} 
              submission={submission}  
              detailed={true} 
              onUpdate={(updatedData) => handleUpdate(submission.id, updatedData)}
              onDelete={() => handleDelete(submission.id)}
            />
          ))
        ) : (
          <p className="text-muted-foreground">No submissions found</p>
        )}
      </CardContent>
    </Card>
  );
};

export default SubmissionList;