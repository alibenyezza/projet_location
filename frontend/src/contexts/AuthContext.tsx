import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

// Types
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'tenant' | 'owner' | 'admin';
  phone_number?: string;
  bio?: string;
  profile_picture?: string;
  is_verified?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
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
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = async () => {
      try {
        // Mock user for now
        const mockUser: User = {
          id: '1',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          role: 'tenant',
          phone_number: '555-123-4567',
          bio: 'I am a tenant looking for a nice place.',
          profile_picture: 'https://via.placeholder.com/150',
          is_verified: true,
        };
        setUser(mockUser);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Mock login for now
      const mockUser: User = {
        id: '1',
        first_name: 'John',
        last_name: 'Doe',
        email: email,
        role: 'tenant',
        phone_number: '555-123-4567',
        bio: 'I am a tenant looking for a nice place.',
        profile_picture: 'https://via.placeholder.com/150',
        is_verified: true,
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (userData: any) => {
    try {
      setLoading(true);
      // Mock registration
      const mockUser: User = {
        id: '2',
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        role: userData.role || 'tenant',
        is_verified: false,
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout, register }}>
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