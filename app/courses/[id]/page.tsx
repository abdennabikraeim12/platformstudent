"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Plus, Calendar, Users } from "lucide-react";
import { Label } from "../../components/ui/label"; // Changed import
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialoge"; 
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

import { formatDistanceToNow } from "date-fns";
import AppLayout from "../../components/appLayout";
import AssignmentForm from "../../components/assignements/assignmentForm";
import AssignmentCard from "../../components/assignements/assignmentCard";
import StudentAssignment from "../../components/courses/studentAssignment";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Assignment, Course, UpdateCourseDto } from "@/app/types";
import apiService from "@/app/services/api";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editFormData, setEditFormData] = useState<UpdateCourseDto>({
    title: "",
    description: "",
  });

  const loadCourse =useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      const data = await apiService.getCourse(id);
      setCourse(data || null);
      // Initialize edit form data when course is loaded
      setEditFormData({
        title: data?.title || "",
        description: data?.description || "",
      });
    } catch (error) {
      console.error("Error loading course details:", error);
    } finally {
      setIsLoading(false);
    }
  },[id]);

  useEffect(() => {
    loadCourse();
  }, [loadCourse]);

  const handleAssignmentCreated = () => {
    setShowAssignmentForm(false);
    loadCourse();
  };

  const handleStudentsAssigned = () => {
    loadCourse();
  };

  const handleAssignmentStatusChange = (updatedAssignment: Assignment) => {
    if (course && course.assignments) {
      const updatedAssignments = course.assignments.map((a) =>
        a.id === updatedAssignment.id ? updatedAssignment : a
      );
      setCourse({
        ...course,
        assignments: updatedAssignments,
      });
    }
  };

  const handleEditCourse = async () => {
    if (!id) return;

    try {
      const updatedCourse = await apiService.updateCourse(id, editFormData);
      setCourse(updatedCourse);
      setShowEditDialog(false);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </AppLayout>
    );
  }

  if (!course) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Course not found</h2>
          <p className="text-muted-foreground mb-6">
            The course you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">{course.title}</h1>
            <p className="text-muted-foreground mt-1">
              Created{" "}
              {formatDistanceToNow(new Date(course.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              style={{backgroundColor:"#16c9d5"}}
              onClick={() => setShowEditDialog(true)}
            >
              Edit Course
            </Button>
            <Button asChild style={{backgroundColor:"#51c2ca"}}>
              <Link href="/courses">Back to Courses</Link>
            </Button>
          </div>
        </div>

        {/* Edit Course Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={editFormData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editFormData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditCourse}>Save Changes</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Card>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-50">
                <Users className="h-3 w-3 mr-1" />
                {course.students?.length || 0} Students
              </Badge>
              <Badge variant="outline" className="bg-green-50">
                <Calendar className="h-3 w-3 mr-1" />
                {course.assignments?.length || 0} Assignments
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="assignments">
          <TabsList className="mb-4">
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          <TabsContent value="assignments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-heading font-semibold">
                Course Assignments
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAssignmentForm(!showAssignmentForm)}
              >
                <Plus className="h-4 w-4 mr-2" />
                {showAssignmentForm ? "Cancel" : "Add Assignment"}
              </Button>
            </div>

            {showAssignmentForm && (
              <AssignmentForm
                courseId={course.id}
                onAssignmentCreated={handleAssignmentCreated}
              />
            )}

            {course.assignments && course.assignments.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {course.assignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    onStatusChange={handleAssignmentStatusChange}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-muted-foreground">No assignments yet</p>
                <Button
                  variant="link"
                  onClick={() => setShowAssignmentForm(true)}
                >
                  Add your first assignment
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-heading font-semibold">
                Enrolled Students
              </h2>
            </div>

            <StudentAssignment
              courseId={course.id}
              onStudentsAssigned={handleStudentsAssigned}
            />

            {course.students && course.students.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Currently Enrolled</CardTitle>
                  <CardDescription>
                    {course.students.length}{" "}
                    {course.students.length === 1 ? "student" : "students"}{" "}
                    assigned to this course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="divide-y">
                    {course.students.map((student) => (
                      <li key={student.id} className="py-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {student.email}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/students/${student.id}`}>View</Link>
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-muted-foreground">
                  No students enrolled yet
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CourseDetail;