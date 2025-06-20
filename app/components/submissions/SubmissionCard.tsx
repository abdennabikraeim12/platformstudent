"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { AssignmentSubmission } from '@/app/types';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialoge';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialoge';

interface SubmissionCardProps {
  submission: AssignmentSubmission;
  detailed?: boolean;
  onUpdate?: (updatedData: {
    content?: string;
    grade?: number;
    feedback?: string;
  }) => Promise<void>;
  onDelete?: () => Promise<void>;
}

const SubmissionCard = ({ submission, detailed = false, onUpdate, onDelete }: SubmissionCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [content, setContent] = useState(submission.content);
  const [grade, setGrade] = useState(submission.grade?.toString() || '');
  const [feedback, setFeedback] = useState(submission.feedback || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!onUpdate) return;
    
    setIsSubmitting(true);
    try {
      await onUpdate({
        content,
        grade: grade ? Number(grade) : undefined,
        feedback: feedback || undefined
      });
      setIsEditing(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    
    try {
      await onDelete();
    } catch (error) {
      console.error('Failed to delete submission:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>
            Submission for {submission.assignment?.title}
          </CardTitle>
          {submission.grade !== undefined && (
            <Badge variant="outline" className="bg-green-50">
              Grade: {submission.grade}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="font-medium mb-2">Content:</h3>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {submission.content}
          </p>
        </div>

        {submission.feedback && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">Feedback:</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {submission.feedback}
            </p>
          </div>
        )}

        {detailed && (
          <div className="mt-4 flex space-x-2">
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="outline" style={{backgroundColor:"#cdf5bb"}}>Edit</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Submission</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="grade">Grade</Label>
                    <Input
                      id="grade"
                      type="number"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="feedback">Feedback</Label>
                    <Textarea
                      id="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      style={{backgroundColor:"#cdf5bb"}}
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      style={{backgroundColor:"#cdf5bb"}}
                    >
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" style={{backgroundColor:"#ffcccc"}}>
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the submission.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDelete}
                    style={{backgroundColor:"#ff6666"}}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Link href={`/submissions/${submission.id}/edit-page`}>
              <Button variant="outline" style={{backgroundColor:"#cdf4f3"}}>View Assignment</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubmissionCard;