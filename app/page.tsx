"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { setAuthToken } from './api';
import { 
   
  BookOpen, 
  Users, 
  FileText, 
  LogOut,
  Calendar,
  Award,
  Settings,
  User
} from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setAuthToken(token);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <Link href="/">
            <h1 className="text-2xl font-bold text-gray-800">EduPlatform</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4"
         
          >
            <button className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"  onClick={() => router.push('/profile')}>
              <User className="h-5 w-5" />
              <span>Profile</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-lg text-gray-600">Here is what is happening today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Courses</p>
                <p className="text-2xl font-semibold text-gray-900">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Assignments Due</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Your Progress</p>
                <p className="text-2xl font-semibold text-gray-900">78%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/courses" className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col items-center">
              <BookOpen className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="font-medium text-gray-700">My Courses</span>
            </Link>

            <Link href="/assignments" className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col items-center">
              <FileText className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="font-medium text-gray-700">Assignments</span>
            </Link>

            <Link href="/students" className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col items-center">
              <Calendar className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="font-medium text-gray-700">Students</span>
            </Link>

            <Link href="/settings" className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col items-center">
              <Settings className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="font-medium text-gray-700">Settings</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
            <Link href="/activity" className="text-sm text-indigo-600 hover:underline">View All</Link>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-50 rounded-full">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">New course material added</p>
                <p className="text-sm text-gray-500">Mathematics 101 - 2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-50 rounded-full">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Assignment graded</p>
                <p className="text-sm text-gray-500">History Essay - 1 day ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-purple-50 rounded-full">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">New class announcement</p>
                <p className="text-sm text-gray-500">From Prof. Johnson - 2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} EduPlatform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}