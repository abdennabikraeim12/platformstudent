"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";

import AppLayout from "../components/appLayout";
import CourseFilters from "../components/courses/coursesFiltter";
import CourseCard from "../components/courses/coursesCard";
import { Course, FilterCoursesDto } from "../types";
import apiService from "../services/api";
import Link from "next/link";

const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<FilterCoursesDto>({});

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getCourses(activeFilters);
        setCourses(data);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, [activeFilters]);

  const handleFilterChange = (filters: FilterCoursesDto) => {
    setActiveFilters(filters);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-heading font-bold">Courses</h1>
          <Button asChild style={{backgroundColor:"#ddf6b8"}}>
            <Link href="/courses/new">
              <Plus className="h-4 w-4 mr-2" />
              New Course
            </Link>
          </Button>
        </div>

        <CourseFilters onFilterChange={handleFilterChange} />

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-100 h-48 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No courses found</h2>
            <p className="text-muted-foreground mb-6">
              {Object.keys(activeFilters).length > 0
                ? "Try adjusting your filters"
                : "Get started by creating your first course"}
            </p>
            <Button asChild  style={{backgroundColor:"#ddf6b8"}}>
              <Link href="/courses/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Course
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CourseList;