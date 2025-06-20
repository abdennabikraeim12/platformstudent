"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import { useAuth } from "../../context/authContext";
import { Course } from "@/app/types";
import apiService from "@/app/services/api";

interface AssignmentFormProps {
  courseId?: string;
  onAssignmentCreated?: () => void;
}

export function AssignmentForm({
  courseId: initialCourseId,
  onAssignmentCreated,
}: AssignmentFormProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [courseId, setCourseId] = useState(initialCourseId || "");
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCoursesLoading, setIsCoursesLoading] = useState(false);

  const hasPermission = user && ["TEACHER", "ADMIN"].includes(user.role);

  useEffect(() => {
    const loadCourses = async () => {
      setIsCoursesLoading(true);
      try {
        const data = await apiService.getCourses();
        setCourses(data);
      } catch (error) {
        console.log("Error loading courses:", error);
      } finally {
        setIsCoursesLoading(false);
      }
    };

    if (hasPermission) {
      loadCourses();
    }
  }, [user, hasPermission]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasPermission) {
      toast.error("You do not have permission to create assignments");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter an assignment title");
      return;
    }

    if (!courseId) {
      toast.error("Please select a course");
      return;
    }

    if (!dueDate) {
      toast.error("Please select a due date");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to create an assignment");
      return;
    }

    setIsLoading(true);

    try {
      await apiService.createAssignment({
        title,
        description,
        dueDate: new Date(dueDate).toISOString(),
        courseId: parseInt(courseId),
        creatorId: user.id,
      });

      toast.success("Assignment created successfully");

      // Reset form
      setTitle("");
      setDescription("");
      setDueDate("");
      if (!initialCourseId) setCourseId("");

      if (onAssignmentCreated) {
        onAssignmentCreated();
      }
    } catch (error) {
      console.log("Error creating assignment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const today = format(new Date(), "yyyy-MM-dd");

  if (!hasPermission) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create New Assignment</CardTitle>
          <CardDescription>Restricted Access</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">
            Only teachers and admins can create assignments.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle >Create New Assignment</CardTitle>
        <CardDescription>Add a new assignment to a course</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Assignment Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Final Project"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter assignment details..."
              rows={3}
            />
          </div>

          {!initialCourseId && (
            <div className="space-y-2">
              <label htmlFor="course" className="text-sm font-medium">
                Course
              </label>
              <Select
                value={courseId}
                onValueChange={setCourseId}
                required
                disabled={isCoursesLoading}
              >
                <SelectTrigger id="course">
                  <SelectValue
                    placeholder={
                      isCoursesLoading ? "Loading courses..." : "Select course"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id.toString()}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="dueDate" className="text-sm font-medium">
              Due Date
            </label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={today}
              required
            />
          </div>

          <Button style={{backgroundColor:"#cdf4f3"}} type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Assignment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default AssignmentForm;