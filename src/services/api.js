import axios from 'axios';

// In development, the proxy will route requests to the backend
// In production, the Express server will serve both API and static files
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      // Server responded with error status
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', error.response.data);
    } else if (error.request) {
      // Request was made but no response
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Error Message:', error.message);
    }
    return Promise.reject(error);
  }
);

export const learningPlanAPI = {
  // Generate learning plan
  generateLearningPlan: async (planData) => {
    try {
      const response = await api.post('/learning-plan/generate', planData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to generate learning plan');
    }
  },

  // Export learning plan to Excel
  exportLearningPlan: async (planData) => {
    try {
      const response = await api.post('/learning-plan/export', planData, {
        responseType: 'blob',
      });
      
      // Create blob and download
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Extract filename from response headers or use default
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'learning-plan.xlsx';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return { success: true, message: 'File downloaded successfully' };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to export learning plan');
    }
  },

  // Get available technologies
  getAvailableTechnologies: async () => {
    try {
      const response = await api.get('/technologies');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch technologies');
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('Backend service is not available');
    }
  },
};

export default api; 