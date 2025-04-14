import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Find Your Perfect</span>
              <span className="block text-primary-600">Rental Property</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Connect directly with property owners and tenants without intermediaries.
              Find your perfect home or the ideal tenant for your property.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/listings/search"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                >
                  Find Properties
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Sign Up Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">
              How It Works
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Connecting owners and tenants directly
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform simplifies the rental process by removing intermediaries and
              allowing direct communication between property owners and potential tenants.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  1
                </div>
                <div className="mt-5 text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Create an Account
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Sign up as a property owner or tenant and create your profile.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  2
                </div>
                <div className="mt-5 text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Post or Browse Listings
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Owners can post their properties, and tenants can search for their ideal home.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  3
                </div>
                <div className="mt-5 text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Connect and Communicate
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Use our secure messaging system to discuss details and arrange visits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 