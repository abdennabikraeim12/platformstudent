"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Mail, 
  Settings, 
   
  Users, 
  MessageSquare,
  Bell,
  BookOpen,
  ClipboardList,
  Award,
  FileText
} from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');
  const [user] = useState({
    name: 'Abdennabi Kraeim',
    avatar: 'https://res.cloudinary.com/abdoudev/image/upload/v1745937206/avatars/kenan1_o34bxh.jpg',
    cover: 'https://res.cloudinary.com/abdoudev/image/upload/v1741268383/image/image-afe2f278-112b-4541-a32b-c101205e10d6-1741268390240.jpg',
    bio: 'Computer Science Student | Class of 2025',
    enrolledCourses: 5,
    completedAssignments: 23,
    pendingAssignments: 4,
    gpa: 3.8,
    joined: 'September 2022',
    email: 'abdennabikraeim@gmail.com',
    department: 'School of Computer Science',
  });

  // Sample data for courses and assignments
  const [courses] = useState([
    {
      id: 1,
      title: 'Advanced Algorithms',
      code: 'CS-401',
      instructor: 'Dr. Smith',
      progress: 75,
      nextAssignment: 'Final Project - Due May 15',
    },
    {
      id: 2,
      title: 'Database Systems',
      code: 'CS-402',
      instructor: 'Prof. Johnson',
      progress: 90,
      nextAssignment: 'None - Course completed',
    },
    {
      id: 3,
      title: 'Web Development',
      code: 'CS-403',
      instructor: 'Dr. Williams',
      progress: 60,
      nextAssignment: 'React Project - Due May 10',
    },
  ]);

  const [assignments] = useState([
    {
      id: 1,
      course: 'Advanced Algorithms',
      title: 'Final Project',
      dueDate: '2024-05-15',
      status: 'Pending',
      submitted: false,
    },
    {
      id: 2,
      course: 'Web Development',
      title: 'React Project',
      dueDate: '2024-05-10',
      status: 'Pending',
      submitted: false,
    },
    {
      id: 3,
      course: 'Database Systems',
      title: 'Final Exam',
      dueDate: '2024-04-28',
      status: 'Submitted',
      submitted: true,
      grade: 'A',
    },
  ]);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Cover Photo */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-64 w-full bg-blue-500 overflow-hidden"
      >
        <Image 
  src={user.avatar} 
  alt="Profile"
  width={500} 
  height={500} 
  priority 
/>
       
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </motion.div>

      {/* Profile Header */}
      <div className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-end -mt-16 relative z-10"
        >
          <div className="relative group">
            <Image 
              src={user.cover} 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Settings className="text-white h-6 w-6" />
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 sm:ml-6">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.bio}</p>
            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" /> {user.enrolledCourses} courses
              </span>
              <span className="flex items-center">
                <ClipboardList className="h-4 w-4 mr-1" /> {user.completedAssignments} assignments
              </span>
              <span className="flex items-center">
                <Award className="h-4 w-4 mr-1" /> GPA: {user.gpa}
              </span>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 sm:ml-auto flex space-x-3">
            <Button variant="outline" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" /> Contact
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
              <Bell className="h-4 w-4 mr-2" /> Follow
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 border-b border-gray-200"
        >
          <nav className="flex space-x-8">
            <button 
              onClick={() => setActiveTab('courses')}
              className={`px-1 py-4 text-sm font-medium ${activeTab === 'courses' ? 'border-b-2 border-blue-500 text-blue-600' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              My Courses
            </button>
            <button 
              onClick={() => setActiveTab('assignments')}
              className={`px-1 py-4 text-sm font-medium ${activeTab === 'assignments' ? 'border-b-2 border-blue-500 text-blue-600' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Assignments
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className={`px-1 py-4 text-sm font-medium ${activeTab === 'about' ? 'border-b-2 border-blue-500 text-blue-600' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              About
            </button>
          </nav>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="lg:col-span-1 space-y-4"
        >
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-4">Academic Info</h2>
            <div className="space-y-3">
              <div className="flex items-center text-gray-500">
                <BookOpen className="h-4 w-4 mr-2" />
                <span>{user.enrolledCourses} Enrolled Courses</span>
              </div>
              <div className="flex items-center text-gray-500">
                <ClipboardList className="h-4 w-4 mr-2" />
                <span>{user.completedAssignments} Completed Assignments</span>
              </div>
              <div className="flex items-center text-gray-500">
                <FileText className="h-4 w-4 mr-2" />
                <span>{user.pendingAssignments} Pending Assignments</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Award className="h-4 w-4 mr-2" />
                <span>GPA: {user.gpa}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-4">Personal Info</h2>
            <div className="space-y-3">
              <div className="flex items-center text-gray-500">
                <Mail className="h-4 w-4 mr-2" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Joined {user.joined}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Users className="h-4 w-4 mr-2" />
                <span>{user.department}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="lg:col-span-2 space-y-4"
        >
          {activeTab === 'courses' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">My Courses</h2>
              {courses.map((course) => (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  key={course.id}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{course.title}</h3>
                        <p className="text-gray-500">{course.code} • {course.instructor}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-500 mr-2">
                          {course.progress}% complete
                        </span>
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Next:</span> {course.nextAssignment}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      View Course
                    </Button>
                    <Button size="sm">
                      Continue Learning
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Assignments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold mb-2">Pending Assignments</h3>
                  {assignments.filter(a => !a.submitted).map((assignment) => (
                    <div key={assignment.id} className="mb-3 pb-3 border-b border-gray-100 last:border-0">
                      <h4 className="font-medium">{assignment.title}</h4>
                      <p className="text-sm text-gray-500">{assignment.course}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-red-500">Due: {assignment.dueDate}</span>
                        <Button size="sm" className="text-xs">
                          Submit
                        </Button>
                      </div>
                    </div>
                  ))}
                  {assignments.filter(a => !a.submitted).length === 0 && (
                    <p className="text-sm text-gray-500">No pending assignments</p>
                  )}
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold mb-2">Completed Assignments</h3>
                  {assignments.filter(a => a.submitted).map((assignment) => (
                    <div key={assignment.id} className="mb-3 pb-3 border-b border-gray-100 last:border-0">
                      <h4 className="font-medium">{assignment.title}</h4>
                      <p className="text-sm text-gray-500">{assignment.course}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-green-500">Submitted</span>
                        {assignment.grade && (
                          <span className="text-xs font-medium">Grade: {assignment.grade}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  {assignments.filter(a => a.submitted).length === 0 && (
                    <p className="text-sm text-gray-500">No completed assignments</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">About</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Bio</h3>
                  <p className="text-gray-600 mt-1">{user.bio}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Education</h3>
                  <p className="text-gray-600 mt-1">{user.department}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Contact Information</h3>
                  <p className="text-gray-600 mt-1">{user.email}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Academic Stats</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Courses</p>
                      <p className="font-semibold">{user.enrolledCourses}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">GPA</p>
                      <p className="font-semibold">{user.gpa}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Completed</p>
                      <p className="font-semibold">{user.completedAssignments}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Pending</p>
                      <p className="font-semibold">{user.pendingAssignments}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;