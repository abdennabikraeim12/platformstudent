import { 
    Assignment,
  AssignmentSubmission,
  Course, 
  CreateAssignmentDto, 
  CreateCourseDto, 
  CreateSubmissionDto, 
  CreateUserDto, 
  EnrollStudentDto, 
  EnrollStudentsDto, 
  FilterCoursesDto, 
  Student, 
  UpdateAssignmentDto, 
  UpdateCourseDto, 
  UpdateSubmissionDto, 
  UpdateUserDto, 
  User
} from '../types';
import api from '../api';


// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.withCredentials = true;
  }
  return config;
});
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Service API complet
const apiService = {
  // Student methods
  createUser: async (data: CreateUserDto): Promise<User> => {
    try {
      const response = await api.post('/users', data);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  getTeachers: async (): Promise<User[]> => {
    try {
      const response = await api.get('/users/teachers');
      return response.data;
    } catch (error) {
      console.error('Error fetching teachers:', error);
      throw error;
    }
  },
  getStudents: async (): Promise<Student[]> => {
    try {
      const response = await api.get('/users/students');
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  getStudent: async (id: string): Promise<Student> => {
    try {
      const response = await api.get(`/users/students/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching student ${id}:`, error);
      throw error;
    }
  },
  deleteStudent: async (id: string): Promise<void> => {
    try {
      await api.delete(`/users/students/${id}`);
    } catch (error) {
      console.error(`Error deleting student ${id}:`, error);
      throw error;
    }
  },

  createStudent: async (data: CreateUserDto): Promise<Student> => {
    try {
      const response = await api.post('/students', data);
      return response.data;
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  },
  //getStudents: async (): Promise<User[]> => {
   // try {
     // const response = await api.get('/users/students');
      //return response.data;
   // } catch (error) {
     // console.error('Error fetching students:', error);
     // throw error;
   // }
  //},

  // Course methods
  getCourses: async (filters?: FilterCoursesDto): Promise<Course[]> => {
    try {
      const response = await api.get('/courses', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  getCourse: async (id: string): Promise<Course> => {
    try {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      throw error;
    }
  },
  getEnrollments: async (courseId: number): Promise<Course> => {
    try {
      const response = await api.get(`/courses/${courseId}/enrollments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      throw error;
    }
  },

  enrollStudent: async (courseId: number, data: EnrollStudentDto): Promise<Course> => {
    try {
      const response = await api.post(`/courses/${courseId}/enroll-student`, data);
      return response.data;
    } catch (error) {
      console.error('Error enrolling student:', error);
      throw error;
    }
  },

  deleteEnrollment: async (enrollmentId: number): Promise<void> => {
    try {
      await api.delete(`/enrollments/${enrollmentId}`);
    } catch (error) {
      console.error('Error deleting enrollment:', error);
      throw error;
    }
  },
  createCourse: async (data: CreateCourseDto): Promise<Course> => {
    try {
      const response = await api.post('/courses', data);
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },

  updateCourse: async (id: string, data: UpdateCourseDto): Promise<Course> => {
    try {
      const response = await api.patch(`/courses/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating course ${id}:`, error);
      throw error;
    }
  },

  deleteCourse: async (id: string): Promise<void> => {
    try {
      await api.delete(`/courses/${id}`);
    } catch (error) {
      console.error(`Error deleting course ${id}:`, error);
      throw error;
    }
  },

  // Enrollment methods
  enrollStudents: async (courseId: string, data: EnrollStudentsDto): Promise<void> => {
    try {
      await api.post(`/courses/${courseId}/enroll`, data);
    } catch (error) {
      console.error(`Error enrolling students to course ${courseId}:`, error);
      throw error;
    }
  },

 

  
   // Assignment methods
   getAssignments: async (courseId?: string): Promise<Assignment[]> => {
    try {
      const url = courseId ? `/assignments/course/${courseId}` : '/assignments';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.log('Error fetching assignments:', error);
      throw error;
    }
  },
  getAssignment: async (id: string): Promise<Assignment> => {
    try {
      const response = await api.get(`/assignments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching assignment ${id}:`, error);
      throw error;
    }
  },
  createAssignment: async (data: CreateAssignmentDto): Promise<Assignment> => {
    try {
      const response = await api.post('/assignments', data);
      return response.data;
    } catch (error) {
      console.error('Error creating assignment:', error);
      throw error;
    }
  },

  updateAssignment: async (id: string, data: UpdateAssignmentDto): Promise<Assignment> => {
    try {
      const response = await api.patch(`/assignments/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating assignment ${id}:`, error);
      throw error;
    }
  },

  deleteAssignment: async (id: string): Promise<void> => {
    try {
      await api.delete(`/assignments/${id}`);
    } catch (error) {
      console.error(`Error deleting assignment ${id}:`, error);
      throw error;
    }
  },

  updateAssignmentStatus: async (id: string, completed: boolean): Promise<Assignment> => {
    try {
      const response = await api.patch(`/assignments/${id}/status`, { completed });
      return response.data;
    } catch (error) {
      console.error(`Error updating assignment status ${id}:`, error);
      throw error;
    }
  },
  updateStudent: async (id: string, data: UpdateUserDto): Promise<Student> => {
    try {
      const response = await api.patch(`/users/students/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating student ${id}:`, error);
      throw error;
    }
  },
  updateTeacher: async (id: string, data: UpdateUserDto): Promise<User> => {
    try {
      const response = await api.patch(`/users/teachers/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating teacher ${id}:`, error);
      throw error;
    }
  },
  // Submission methods
  createSubmission: async (data: CreateSubmissionDto): Promise<AssignmentSubmission> => {
    try {
      const response = await api.post('/submissions', data);
      return response.data;
    } catch (error) {
      console.error('Error creating submission:', error);
      throw error;
    }
  },

  getSubmissions: async (): Promise<AssignmentSubmission[]> => {
    try {
      const response = await api.get('/submissions');
      return response.data;
    } catch (error) {
      console.error('Error fetching submissions:', error);
      throw error;
    }
  },

  getSubmission: async (id: string): Promise<AssignmentSubmission> => {
    try {
      const response = await api.get(`/submissions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching submission ${id}:`, error);
      throw error;
    }
  },

  getSubmissionsForAssignment: async (assignmentId: string): Promise<AssignmentSubmission[]> => {
    try {
      const response = await api.get(`/submissions/assignment/${assignmentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching submissions for assignment ${assignmentId}:`, error);
      throw error;
    }
  },

  updateSubmission: async (id: string, data: UpdateSubmissionDto): Promise<AssignmentSubmission> => {
    try {
      const response = await api.patch(`/submissions/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating submission ${id}:`, error);
      throw error;
    }
  },

  deleteSubmission: async (id: string): Promise<void> => {
    try {
      await api.delete(`/submissions/${id}`);
    } catch (error) {
      console.error(`Error deleting submission ${id}:`, error);
      throw error;
    }
  },


};

export { api };
export default apiService;