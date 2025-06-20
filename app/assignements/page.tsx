"use client"


import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";

import apiService from "../services/api";
import AppLayout from "../components/appLayout";
import AssignmentCard from "../components/assignements/assignmentCard";
import { Assignment } from "../types";
import AssignmentForm from "../components/assignements/assignmentForm";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const loadAssignments = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getAssignments();
      setAssignments(data);
    } catch (error) {
      console.error("Error loading assignments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  const handleAssignmentCreated = () => {
    setShowForm(false);
    loadAssignments();
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-heading font-bold">Assignments</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            {showForm ? "Cancel" : "New Assignment"}
          </Button>
        </div>

        {showForm && (
          <div className="mb-6">
            <AssignmentForm onAssignmentCreated={handleAssignmentCreated} />
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-100 h-48 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : assignments.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No assignments found</h2>
            <p className="text-muted-foreground mb-6">
              Get started by creating your first assignment
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {assignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                showCourseInfo={true}
                onStatusChange={(updated) => {
                  setAssignments((prev) =>
                    prev.map((a) => (a.id === updated.id ? updated : a))
                  );
                }}
              />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default AssignmentList;