import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const MainLayout: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-primary-600">
                  Location Platform
                </Link>
              </div>
              <nav className="ml-6 flex space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Home
                </Link>
                <Link
                  to="/listings/search"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Find Properties
                </Link>
                {isAuthenticated && user?.role === 'owner' && (
                  <Link
                    to="/owner/listings"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  >
                    My Listings
                  </Link>
                )}
                {isAuthenticated && user?.role === 'tenant' && (
                  <Link
                    to="/tenant/requests"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  >
                    My Requests
                  </Link>
                )}
                {isAuthenticated && (
                  <Link
                    to="/messages"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  >
                    Messages
                  </Link>
                )}
              </nav>
            </div>

            <div className="flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700"
                  >
                    Dashboard
                  </Link>
                  <div className="ml-3 relative">
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-600 bg-white hover:text-primary-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500 text-center">
              &copy; {new Date().getFullYear()} Location Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 