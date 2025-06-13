import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* User Management Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                User Management
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Manage users, roles, and permissions.</p>
              </div>
              <div className="mt-5">
                <Link
                  to="/users"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Manage Users
                </Link>
              </div>
            </div>
          </div>

          {/* Route Management Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Route Management
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>View and manage delivery routes.</p>
              </div>
              <div className="mt-5">
                <Link
                  to="/routes"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Manage Routes
                </Link>
              </div>
            </div>
          </div>

          {/* Alert Management Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Alert Management
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Monitor and manage system alerts.</p>
              </div>
              <div className="mt-5">
                <Link
                  to="/alerts"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Manage Alerts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
