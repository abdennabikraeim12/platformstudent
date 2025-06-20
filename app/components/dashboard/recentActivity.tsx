"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface ActivityItem {
  id: string;
  description: string;
  time: string;
  type: 'course' | 'student' | 'assignment';
}

const activityItems: ActivityItem[] = [
  {
    id: '1',
    description: 'New student "John Doe" registered',
    time: '2 hours ago',
    type: 'student',
  },
  {
    id: '2',
    description: 'Assignment "Build a Portfolio" was added to "Web Development"',
    time: '1 day ago',
    type: 'assignment',
  },
  {
    id: '3',
    description: 'New course "Introduction to Python" created',
    time: '2 days ago',
    type: 'course',
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activityItems.map((item) => (
            <div key={item.id} className="flex items-start gap-4 rounded-lg border p-3">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{item.description}</p>
                <p className="text-sm text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentActivity;