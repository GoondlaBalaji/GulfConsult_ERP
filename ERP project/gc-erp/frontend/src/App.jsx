import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import OTPVerification from './pages/OTPVerification';

import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import JobOpenings from './pages/JobOpenings';
import NewJoiners from './pages/NewJoiners';
import Documents from './pages/Documents';
import Projects from './pages/Projects';
import TimeTracking from './pages/TimeTracking';
import Timesheets from './pages/Timesheets';
import Payroll from './pages/Payroll';
import Allowances from './pages/Allowances';
import Deductions from './pages/Deductions';
import Users from './pages/Users';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, currentUser } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = currentUser?.role_vc || currentUser?.role;
    // System Administrator has full superuser clearance across all modules
    if (userRole !== 'System Administrator' && !allowedRoles.includes(userRole)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/otp-verify" element={<OTPVerification />} />

          {/* Protected ERP Application Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route 
              path="employees" 
              element={
                <ProtectedRoute allowedRoles={['System Administrator', 'HR Manager']}>
                  <Employees />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="job-openings" 
              element={
                <ProtectedRoute allowedRoles={['System Administrator', 'HR Manager']}>
                  <JobOpenings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="new-joiners" 
              element={
                <ProtectedRoute allowedRoles={['System Administrator', 'HR Manager']}>
                  <NewJoiners />
                </ProtectedRoute>
              } 
            />
            <Route path="documents" element={<Documents />} />
            <Route 
              path="projects" 
              element={
                <ProtectedRoute allowedRoles={['System Administrator', 'Project Manager', 'HR Manager']}>
                  <Projects />
                </ProtectedRoute>
              } 
            />
            <Route path="time-tracking" element={<TimeTracking />} />
            <Route path="timesheets" element={<Timesheets />} />
            <Route 
              path="payroll" 
              element={
                <ProtectedRoute allowedRoles={['System Administrator', 'HR Manager']}>
                  <Payroll />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="allowances" 
              element={
                <ProtectedRoute allowedRoles={['System Administrator', 'HR Manager']}>
                  <Allowances />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="deductions" 
              element={
                <ProtectedRoute allowedRoles={['System Administrator', 'HR Manager']}>
                  <Deductions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="users" 
              element={
                <ProtectedRoute allowedRoles={['System Administrator']}>
                  <Users />
                </ProtectedRoute>
              } 
            />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
