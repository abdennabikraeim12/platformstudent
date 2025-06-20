import React from "react";

import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import AppLayout from "../components/appLayout";
import StudentForm from "../components/students/studentForm";
import Link from "next/link";

const StudentCreate = () => {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/students">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Students
            </Link>
          </Button>
          <h1 className="text-3xl font-heading font-bold">
            Create New Student
          </h1>
          <p className="text-muted-foreground mt-1">
            Register a new student to your platform
          </p>
        </div>

        <StudentForm />
      </div>
    </AppLayout>
  );
};

export default StudentCreate;
