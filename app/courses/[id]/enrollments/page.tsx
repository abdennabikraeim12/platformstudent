"use client";

import React from 'react';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import apiService from '@/app/services/api';

const CourseEnrollmentsPage = ({ params }: { params: { id: string } }) => {
  const [enrollments, setEnrollments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const data = await apiService.getEnrollments(parseInt(params.id));
        setEnrollments(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, [params.id]);

  const handleDelete = async (enrollmentId: number) => {
    try {
      await apiService.deleteEnrollment(enrollmentId);
      setEnrollments(prev => prev.filter(e => e.id !== enrollmentId));
    } catch (error) {
      console.error('Failed to delete enrollment:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading enrollments</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Enrollments</h1>
        <Link href={`/courses/${params.id}/enrollments/new`}>
          <Button>Add Student</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enrolled Students</CardTitle>
        </CardHeader>
        <CardContent>
          {enrollments.length > 0 ? (
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <div key={enrollment.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{enrollment.student.name}</h3>
                    <p className="text-sm text-gray-500">Student ID: {enrollment.student.id}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDelete(enrollment.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No students enrolled yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseEnrollmentsPage;