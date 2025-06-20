"use client"
import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { BookOpen, Users, FileText, Plus } from "lucide-react";

import AppLayout from "../components/appLayout";
import DashboardCard from "../components/dashboard/dashboardCard";
import RecentActivity from "../components/dashboard/recentActivity";
import apiService from "../services/api";
import { Assignment, Course, Student } from "../types";
import Link from "next/link";

const Index = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [coursesData, studentsData, assignmentsData] = await Promise.all([
          apiService.getCourses(),
          apiService.getStudents(),
          apiService.getAssignments(),
        ]);

        setCourses(coursesData);
        setStudents(studentsData);
        setAssignments(assignmentsData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between" >
          <h1 className="text-3xl font-heading font-bold tracking-tight" style={{color:"#16c9d5"}}>
            Dashboard
          </h1>
          <div className="flex space-x-2">
            <Button asChild style={{backgroundColor:"#16c9d5"}}>
              <Link href="/courses/new">
                <Plus className="h-4 w-4 mr-2" />
                New Course
              </Link>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-100 h-32 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard
              title="Total Courses"
              value={courses.length}
              icon={<BookOpen className="h-4 w-4 text-blue-500" />}
              trend={{ value: 10, label: "from last month" }}
              className="border-blue-100"
            />
            <DashboardCard
              title="Total Students"
              value={students.length}
              icon={<Users className="h-4 w-4 text-green-500" />}
              trend={{ value: 5, label: "from last month" }}
              className="border-green-100"
            />
            <DashboardCard
              title="Assignments"
              value={assignments.length}
              icon={<FileText className="h-4 w-4 text-purple-500" />}
              trend={{ value: 15, label: "from last month" }}
              className="border-purple-100"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-heading font-semibold mb-4">
              Recent Courses
            </h2>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-gray-100 h-24 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {courses.slice(0, 3).map((course) => (
                  <div
                    key={course.id}
                    className="bg-white p-4 rounded-lg border"
                  >
                    <h3 className="font-medium">
                      <Link
                        href={`/courses/${course.id}`}
                        className="hover:text-primary"
                      >
                        {course.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {course.description}
                    </p>
                  </div>
                ))}
                <Button asChild variant="outline" size="sm">
                  <Link href="/courses">View All Courses</Link>
                </Button>
              </div>
            )}
          </div>

          <RecentActivity />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
