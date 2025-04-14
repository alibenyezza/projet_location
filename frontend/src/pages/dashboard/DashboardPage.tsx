import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, User } from '../../contexts/AuthContext';
import api from '../../services/api';

interface DashboardStats {
  listingCount?: number;
  requestCount?: number;
  messageCount?: number;
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/api/v1/dashboard/stats');
        setStats(response.data);
      } catch (err: any) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Dashboard
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          {user?.role === 'owner' && (
            <Link
              to="/owner/listings/create"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add New Listing
            </Link>
          )}
          {user?.role === 'tenant' && (
            <Link
              to="/tenant/requests/create"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Post New Request
            </Link>
          )}
        </div>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {user?.role === 'owner' 
                    ? 'Your Listings' 
                    : user?.role === 'tenant' 
                    ? 'Your Requests' 
                    : 'Total Listings'}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {user?.role === 'owner' || user?.role === 'admin'
                    ? stats.listingCount || 0
                    : stats.requestCount || 0}
                </dd>
              </dl>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link
                  to={user?.role === 'owner' 
                    ? '/owner/listings' 
                    : user?.role === 'tenant' 
                    ? '/tenant/requests' 
                    : '/admin/listings'}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  View all
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {user?.role === 'admin' ? 'Total Users' : 'Unread Messages'}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {stats.messageCount || 0}
                </dd>
              </dl>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link
                  to={user?.role === 'admin' ? '/admin/users' : '/messages'}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  View all
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Profile Completeness
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {user?.is_verified ? '100%' : '80%'}
                </dd>
              </dl>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link
                  to="/profile"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  {user?.is_verified ? 'View profile' : 'Complete profile'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Recent Activity
        </h3>
        <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            <li>
              <div className="px-4 py-4 sm:px-6">
                <p className="text-sm text-gray-500">
                  No recent activities to display.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 