"use client"

import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, X } from 'lucide-react';
import { FilterCoursesDto, Student } from '@/app/types';
import apiService from '@/app/services/api';

interface CourseFiltersProps {
  onFilterChange: (filters: FilterCoursesDto) => void;
}

export function CourseFilters({ onFilterChange }: CourseFiltersProps) {
  const [title, setTitle] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await apiService.getStudents();
        setStudents(data);
      } catch (error) {
        console.error('Failed to load students:', error);
      }
    };
    
    loadStudents();
  }, []);
  
  const handleFilter = () => {
    const filters: FilterCoursesDto = {
      ...(title && { title }),
      ...(selectedStudent && selectedStudent !== 'all' && { 
        studentName: students.find(s => s.id === selectedStudent)?.name 
      }),
      ...(assignmentTitle && { assignmentTitle }),
    };
    
    onFilterChange(filters);
  };
  
  const handleReset = () => {
    setTitle('');
    setSelectedStudent('all');
    setAssignmentTitle('');
    onFilterChange({});
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      <h2 className="text-lg font-medium mb-4">Filter Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="title-filter" className="text-sm">Course Title</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="title-filter"
              placeholder="Search by title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="student-filter" className="text-sm">Student</label>
          <Select 
            value={selectedStudent} 
            onValueChange={(value) => setSelectedStudent(value)}
          >
           <SelectTrigger id="student-filter">
              <SelectValue placeholder="Select student" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="assignment-filter" className="text-sm">Assignment Title</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="assignment-filter"
              placeholder="Search by assignment..."
              value={assignmentTitle}
              onChange={(e) => setAssignmentTitle(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" onClick={handleReset} type="button" style={{backgroundColor:"#f6c7b8"}}>
          <X className="mr-2 h-4 w-4" />
          Clear
        </Button>
        <Button onClick={handleFilter} type="button" style={{backgroundColor:"#c4eef1"}}>
          <Search className="mr-2 h-4 w-4" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

export default CourseFilters;