import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, verifyOtpCode, sendRegisterOtp, verifyRegisterOtp } from '../services/mockAuth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gc_erp_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [pendingOtpUser, setPendingOtpUser] = useState(null);
  const [demoOtp, setDemoOtp] = useState('');

  const login = async (username, password) => {
    const res = await loginUser(username, password);
    setCurrentUser(res.user);
    localStorage.setItem('gc_erp_session', JSON.stringify(res.user));
    if (res.otpRequired) {
      setPendingOtpUser(res.user);
      setDemoOtp(res.otpPreview);
      return { otpRequired: true, otpPreview: res.otpPreview, user: res.user };
    }
    return { success: true, user: res.user };
  };

  const verifyOtp = async (code) => {
    await verifyOtpCode(code);
    if (pendingOtpUser) {
      setCurrentUser(pendingOtpUser);
      localStorage.setItem('gc_erp_session', JSON.stringify(pendingOtpUser));
      setPendingOtpUser(null);
      setDemoOtp('');
    }
    return { success: true };
  };

  const register = async (formData) => {
    return await registerUser(formData);
  };

  const logout = () => {
    setCurrentUser(null);
    setPendingOtpUser(null);
    setDemoOtp('');
    localStorage.removeItem('gc_erp_session');
    sessionStorage.removeItem('pending_otp');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        pendingOtpUser,
        demoOtp,
        login,
        verifyOtp,
        register,
        sendRegisterOtp,
        verifyRegisterOtp,
        logout,
        isAuthenticated: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
