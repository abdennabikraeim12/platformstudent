"use client"

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Course } from '@/app/types';
import { Link } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle>
          <Link to={`/courses/${course.id}`} className="hover:text-primary transition-colors">
            {course.id}
          </Link>
        </CardTitle>
        <CardTitle>
        {course.title}
        </CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 flex-wrap">
          {course.students && (
            <Badge variant="outline" className="bg-blue-50">
              {course.students.length} {course.students.length === 1 ? 'Student' : 'Students'}
            </Badge>
          )}
          {course.assignments && (
            <Badge variant="outline" className="bg-green-50">
              {course.assignments.length} {course.assignments.length === 1 ? 'Assignment' : 'Assignments'}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Created {formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}
      </CardFooter>
    </Card>
  );
}

export default CourseCard;