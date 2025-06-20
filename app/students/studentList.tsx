import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";

import AppLayout from "../components/appLayout";
import StudentCard from "../components/students/studentCard";
import apiService from "../services/api";
import { Student } from "../types";
import Link from "next/link";

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStudents = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Error loading students:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStudents();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-heading font-bold">Students</h1>
          <Button asChild>
            <Link href="/students/new">
              <Plus className="h-4 w-4 mr-2" />
              New Student
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-100 h-48 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : students.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No students found</h2>
            <p className="text-muted-foreground mb-6">
              Get started by adding your first student
            </p>
            <Button asChild>
              <Link href="/students/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default StudentList;
