
"use client";

import React from "react";

import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import AppLayout from "../../components/appLayout";
import CourseForm from "../../components/courses/coursesForm";
import Link from "next/link";

const CourseCreate = () => {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/courses">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
          <h1 className="text-3xl font-heading font-bold" style={{color:"#51c2ca"}}>Create New Course</h1>
          <p className="text-muted-foreground mt-1">
            Add a new course to your platform
          </p>
        </div>

        <CourseForm />
      </div>
    </AppLayout>
  );
};

export default CourseCreate;