'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Student } from '@/app/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import apiService from '@/app/services/api';
import { useAuth } from '@/app/context/authContext';
import { 
  User, 
  Mail, 
  CalendarDays,  
  Trash2,
  Eye,
  GraduationCap,
  NotebookPen
} from 'lucide-react';

interface StudentCardProps {
  student: Student;
  courseCount?: number;
  assignmentCount?: number;
}

export function StudentCard({ student, courseCount = 0, assignmentCount = 0 }: StudentCardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const initials = student.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const handleDelete = async () => {
    try {
      const confirmDelete = confirm(`Are you sure you want to delete ${student.name}?`);
      if (!confirmDelete) return;

      await apiService.deleteStudent(student.id.toString());
      toast.success('Student deleted successfully');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete student');
    }
  };

  const isAdminOrTeacher = user?.role === 'ADMIN' || user?.role === 'TEACHER';

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border border-gray-200 rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
            <AvatarImage src={student.avatarUrl} />
            <AvatarFallback className="bg-indigo-100 text-indigo-600">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <User className="h-4 w-4 text-indigo-600" />
              {student.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{student.email}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CalendarDays className="h-4 w-4 text-gray-500" />
          <span>Joined on {new Date(student.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-md">
            <GraduationCap className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Courses</p>
              <p className="font-medium text-blue-600">{courseCount}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-green-50 p-2 rounded-md">
            <NotebookPen className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Assignments</p>
              <p className="font-medium text-green-600">{assignmentCount}</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex gap-2 w-full">
          <Button asChild variant="outline" size="sm" className="flex-1 gap-2" style={{backgroundColor:"#eef7bf "}}>
            <Link href={`/students/${student.id}`}>
              <Eye className="h-4 w-4" />
              View Profile
            </Link>
          </Button>
          
          {isAdminOrTeacher && (
            <Button
              variant="destructive"
              size="sm"
              className="flex-1 gap-2"
              onClick={handleDelete}
              style={{backgroundColor:"#f7cabf"}}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default StudentCard;