"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { format } from 'date-fns';
import { Assignment } from '@/app/types';
import apiService from '@/app/services/api';

interface AssignmentCardProps {
  assignment: Assignment;
  showCourseInfo?: boolean;
  onStatusChange?: (assignment: Assignment) => void;
}

export function AssignmentCard({ assignment, showCourseInfo = false, onStatusChange }: AssignmentCardProps) {
  const router = useRouter();
  
  // Safely handle potentially undefined values
  const assignmentId = assignment?.id?.toString() || '';
  const title = assignment?.title || 'Untitled Assignment';
  const description = assignment?.description || 'No description provided';
  const courseTitle = assignment?.course?.title || 'No course';
  const completed = assignment?.completed || false;

  // Safely parse dates with fallbacks
  const dueDate = assignment?.dueDate ? new Date(assignment.dueDate) : null;
  const createdAt = assignment?.createdAt ? new Date(assignment.createdAt) : null;
  const isPastDue = dueDate ? dueDate < new Date() : false;

  const handleStatusChange = async (checked: boolean) => {
    if (!assignmentId) return;
    
    try {
      const updatedAssignment = await apiService.updateAssignment(assignmentId, { completed: checked });
      if (updatedAssignment && onStatusChange) {
        onStatusChange(updatedAssignment);
      }
    } catch (error) {
      console.error("Failed to update assignment status", error);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (!assignmentId) return;
    
    const target = e.target as HTMLElement;
    if (target.closest('button, input, a')) {
      return;
    }
    router.push(`/assignements/${assignmentId}`);
  };
  
  return (
    <Card 
      className="card-hover cursor-pointer transition-shadow hover:shadow-md"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {showCourseInfo && (
              <CardDescription>Course: {courseTitle}</CardDescription>
            )}
          </div>
          {dueDate && (
            <Badge 
              variant={isPastDue ? "destructive" : "outline"}
              className={isPastDue ? "" : "bg-blue-50"}
            >
              Due {format(dueDate, 'MMM dd, yyyy')}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 border-t">
        {createdAt && (
          <p className="text-xs text-muted-foreground">
            Created {format(createdAt, 'MMM dd, yyyy')}
          </p>
        )}
        <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
          <Checkbox 
            id={`assignment-${assignmentId}`} 
            checked={completed}
            onCheckedChange={handleStatusChange}
            disabled={!assignmentId}
          />
          <label 
            htmlFor={`assignment-${assignmentId}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {completed ? 'Completed' : 'Mark as complete'}
          </label>
        </div>
      </CardFooter>
    </Card>
  );
}

export default AssignmentCard;