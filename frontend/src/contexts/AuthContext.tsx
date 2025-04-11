import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

// Types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  profile_picture?: string;
  bio?: string;
  is_verified: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  role: string;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in (via token in localStorage)
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Set default auth header
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Get user data
          const response = await api.get('/api/v1/profile');
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Auth check failed:', error);
          // Clear invalid token
          localStorage.removeItem('token');
          api.defaults.headers.common['Authorization'] = '';
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/v1/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Save token
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update state
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/v1/auth/register', userData);
      const { token, user } = response.data;
      
      // Save token
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update state
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear token
    localStorage.removeItem('token');
    api.defaults.headers.common['Authorization'] = '';
    
    // Update state
    setUser(null);
    setIsAuthenticated(false);
  };

  // Context value
  const contextValue: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 