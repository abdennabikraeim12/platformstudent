export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Student extends User {
    role: Role.STUDENT;
  }
  
  export interface Teacher extends User {
    role: Role.TEACHER;
  }
  
  export enum Role {
    ADMIN = 'ADMIN',
    TEACHER = 'TEACHER',
    STUDENT = 'STUDENT',
  }
  
  export interface Course {
    id: number;
    title: string;
    description: string;
    teacherId: string;
    teacher?: Teacher;
    students?: Student[];
    assignments?: Assignment[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Assignment {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    courseId: number;
    createdAt: string;
    updatedAt: string;
  }
  
  // DTOs
  export interface CreateCourseDto {
    title: string;
    description: string;
    teacherId: string;
  }
  
  export interface UpdateCourseDto {
    title?: string;
    description?: string;
    teacherId?: string;
  }
  
  export interface EnrollStudentsDto {
    studentIds: string[];
  }
  
  export interface EnrollStudentDto {
    studentId: string;
  }
  
  export interface FilterCoursesDto {
    title?: string;
    studentId?: string;
    assignmentTitle?: string;
  }
  export interface Assignment {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    courseId: number;
    creatorId: number;
    course?: Course;
    creator?: User;
    //submissions?: Submission[];
  }
  
  export interface CreateAssignmentDto {
    title: string;
    description: string;
    dueDate: string;
    courseId: number;
    creatorId: number;
  }
  export interface CreateUserDto {
    email: string;
    password: string;
    name: string;
    role: Role;
  }
  export interface UpdateAssignmentDto {
    title?: string;
    description?: string;
    dueDate?: string;
    completed?: boolean;
  }
  
  export interface UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
  }
 export  interface AssignmentSubmission {
    id: number;
    content: string;
    grade?: number;
    feedback?: string;
    assignmentId: number;
    studentId: number;
    createdAt: Date;
    updatedAt: Date;
    assignment?: Assignment;
    student?: Student;
  }
  
  export interface CreateSubmissionDto {
    assignmentId: number;
    studentId: number;
    content: string;
  }
  
  export interface UpdateSubmissionDto {
    content?: string;
    grade?: number;
    feedback?: string;
  }