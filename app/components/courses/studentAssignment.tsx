"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Course, EnrollStudentsDto, Student } from '@/app/types';
import apiService from '@/app/services/api';

interface StudentAssignmentProps {
  courseId: string;
  onStudentsAssigned?: () => void;
}

export function StudentAssignment({ courseId, onStudentsAssigned }: StudentAssignmentProps) {
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const [studentsData, courseData] = await Promise.all([
          apiService.getStudents(),
          apiService.getCourse(courseId),
        ]);
        
        setAllStudents(studentsData);
        if (courseData) {
          setCourse(courseData);
          // Pre-select students already in the course
          if (courseData.students) {
            setSelectedStudentIds(courseData.students.map(s => s.id));
          }
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    
    loadData();
  }, [courseId]);
  
  const toggleStudent = (studentId: string) => {
    setSelectedStudentIds(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };
  
  const handleAssignStudents = async () => {
    if (!course) return;
    
    setIsLoading(true);
    
    try {
      const enrollStudentsDto: EnrollStudentsDto = {
        studentIds: selectedStudentIds,
      };
      
      await apiService.enrollStudents(courseId, enrollStudentsDto);
      console.log("Students enrolled successfully");
      
      if (onStudentsAssigned) {
        onStudentsAssigned();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!course) {
    return <div>Loading...</div>;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Enroll Students</CardTitle>
        <CardDescription>Select students to enroll in {course.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-md divide-y">
            {allStudents.length === 0 ? (
              <p className="p-4 text-center text-muted-foreground">No students available</p>
            ) : (
              allStudents.map(student => (
                <div key={student.id} className="flex items-center space-x-2 p-4">
                  <Checkbox 
                    id={`student-${student.id}`}
                    checked={selectedStudentIds.includes(student.id)}
                    onCheckedChange={() => toggleStudent(student.id)}
                  />
                  <label 
                    htmlFor={`student-${student.id}`}
                    className="flex-1 text-sm font-medium cursor-pointer"
                  >
                    {student.name}
                    <span className="block text-xs text-muted-foreground">
                      {student.email}
                    </span>
                  </label>
                </div>
              ))
            )}
          </div>
          
          <Button 
            onClick={handleAssignStudents} 
            disabled={isLoading || allStudents.length === 0}
            className="w-full"
          >
            {isLoading ? 'Saving...' : 'Save Enrollments'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default StudentAssignment;