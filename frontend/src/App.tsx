import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layout Components
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ListingDetailsPage from './pages/listings/ListingDetailsPage';
import SearchListingsPage from './pages/listings/SearchListingsPage';

// Protected Pages
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/profile/ProfilePage';
import MyListingsPage from './pages/owner/MyListingsPage';
import CreateListingPage from './pages/owner/CreateListingPage';
import EditListingPage from './pages/owner/EditListingPage';
import MyRequestsPage from './pages/tenant/MyRequestsPage';
import CreateRequestPage from './pages/tenant/CreateRequestPage';
import MessagesPage from './pages/messages/MessagesPage';
import ConversationPage from './pages/messages/ConversationPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import ManageListingsPage from './pages/admin/ManageListingsPage';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="listings">
          <Route path="search" element={<SearchListingsPage />} />
          <Route path=":id" element={<ListingDetailsPage />} />
        </Route>
      </Route>

      {/* Auth Routes */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="messages">
          <Route index element={<MessagesPage />} />
          <Route path=":id" element={<ConversationPage />} />
        </Route>

        {/* Owner Routes */}
        <Route path="owner">
          <Route path="listings" element={
            <ProtectedRoute requiredRole="owner">
              <MyListingsPage />
            </ProtectedRoute>
          } />
          <Route path="listings/create" element={
            <ProtectedRoute requiredRole="owner">
              <CreateListingPage />
            </ProtectedRoute>
          } />
          <Route path="listings/edit/:id" element={
            <ProtectedRoute requiredRole="owner">
              <EditListingPage />
            </ProtectedRoute>
          } />
        </Route>

        {/* Tenant Routes */}
        <Route path="tenant">
          <Route path="requests" element={
            <ProtectedRoute requiredRole="tenant">
              <MyRequestsPage />
            </ProtectedRoute>
          } />
          <Route path="requests/create" element={
            <ProtectedRoute requiredRole="tenant">
              <CreateRequestPage />
            </ProtectedRoute>
          } />
        </Route>

        {/* Admin Routes */}
        <Route path="admin">
          <Route path="dashboard" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="users" element={
            <ProtectedRoute requiredRole="admin">
              <ManageUsersPage />
            </ProtectedRoute>
          } />
          <Route path="listings" element={
            <ProtectedRoute requiredRole="admin">
              <ManageListingsPage />
            </ProtectedRoute>
          } />
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App; 