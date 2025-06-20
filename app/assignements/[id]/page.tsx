"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Badge } from "@/app/components/ui/badge";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/context/authContext";
import { Assignment } from "@/app/types";
import apiService from "@/app/services/api";
import AppLayout from "@/app/components/appLayout";
import AssignmentForm from "@/app/components/assignements/assignmentForm";

const AssignmentDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Helper function to safely format dates
  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return 'Not set';
    try {
      const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  useEffect(() => {
    const loadAssignment = async () => {
      setIsLoading(true);
      try {
        if (!id) {
          throw new Error("No assignment ID provided");
        }
        
        const data = await apiService.getAssignment(id.toString());
        if (!data?.id) {
          throw new Error("Invalid assignment data");
        }
        setAssignment(data);
      } catch (error) {
        console.error("Error loading assignment:", error);
        toast.error("Failed to load assignment");
        setAssignment(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadAssignment();
  }, [id]);

  const handleDelete = async () => {
    if (!assignment?.id) return;
    
    setIsDeleting(true);
    try {
      await apiService.deleteAssignment(assignment.id.toString());
      toast.success("Assignment deleted successfully");
      router.push("/assignements");
    } catch (error) {
      console.log("Error deleting assignment:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateSuccess = () => {
    setIsEditing(false);
    if (id) {
      apiService.getAssignment(id.toString())
        .then(data => data?.id && setAssignment(data))
        .catch(error => console.error("Error reloading assignment:", error));
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </AppLayout>
    );
  }

  if (!assignment) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">Assignment not found</h2>
          <Button onClick={() => router.push("/assignments")}>
            Back to assignments
          </Button>
        </div>
      </AppLayout>
    );
  }

  const isPastDue = assignment.dueDate ? new Date(assignment.dueDate) < new Date() : false;
  const canEdit = user && ["TEACHER", "ADMIN"].includes(user.role);

  return (
    <AppLayout>
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => router.push("/assignments")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to assignments
        </Button>

        {isEditing ? (
          <AssignmentForm
            courseId={assignment.courseId?.toString()}
            assignmentId={assignment.id.toString()}
            initialData={{
              title: assignment.title || "",
              description: assignment.description || "",
              dueDate: assignment.dueDate ? format(new Date(assignment.dueDate), "yyyy-MM-dd") : "",
            }}
            onAssignmentCreated={handleUpdateSuccess}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{assignment.title || "Untitled Assignment"}</h1>
                <div className="flex items-center gap-4 mt-2">
                  {assignment.dueDate && (
                    <Badge 
                      variant={isPastDue ? "destructive" : "outline"}
                      className={isPastDue ? "" : "bg-blue-50"}
                    >
                      Due {formatDate(assignment.dueDate)}
                    </Badge>
                  )}
                  {assignment.completed && (
                    <Badge >Completed</Badge>
                  )}
                </div>
              </div>
              
              {canEdit && (
                <div className="flex gap-2">
                  <Button 
                  style={{backgroundColor:"#d3f041"}}
                    variant="outline" 
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                   style={{backgroundColor:"#faa8a0"}}
                    variant="destructive" 
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {assignment.description || "No description provided."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold mb-2">Course</h2>
                <p className="text-gray-700">
                  {assignment.course?.title || "No course assigned"}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold mb-2">Created</h2>
                <p className="text-gray-700">
                  {formatDate(assignment.createdAt)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default AssignmentDetailPage;