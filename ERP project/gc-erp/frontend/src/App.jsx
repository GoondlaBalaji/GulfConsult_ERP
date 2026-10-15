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

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
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
            <Route path="employees" element={<Employees />} />
            <Route path="job-openings" element={<JobOpenings />} />
            <Route path="new-joiners" element={<NewJoiners />} />
            <Route path="documents" element={<Documents />} />
            <Route path="projects" element={<Projects />} />
            <Route path="time-tracking" element={<TimeTracking />} />
            <Route path="timesheets" element={<Timesheets />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="allowances" element={<Allowances />} />
            <Route path="deductions" element={<Deductions />} />
            <Route path="users" element={<Users />} />
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
