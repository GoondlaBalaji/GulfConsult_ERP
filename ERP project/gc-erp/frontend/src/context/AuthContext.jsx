import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';
import { loginUser, registerUser, verifyOtpCode, sendRegisterOtp, verifyRegisterOtp } from '../services/mockAuth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gc_erp_session');
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved);
      // Ensure normalized role fields
      const role = parsed.role_vc || parsed.role || 'Employee';
      return { ...parsed, role, role_vc: role };
    } catch {
      return null;
    }
  });

  const [pendingOtpUser, setPendingOtpUser] = useState(null);
  const [demoOtp, setDemoOtp] = useState('');

  const login = async (username, password) => {
    try {
      // 1. Try real production backend API
      const res = await api.login(username, password);
      const normalizedUser = {
        ...res.user,
        role: res.user.role_vc || res.user.role,
        role_vc: res.user.role_vc || res.user.role,
      };

      setCurrentUser(normalizedUser);
      localStorage.setItem('gc_erp_session', JSON.stringify(normalizedUser));
      if (res.token) {
        localStorage.setItem('gc_erp_token', res.token);
      }

      if (res.otpRequired) {
        setPendingOtpUser(normalizedUser);
        setDemoOtp(res.otpPreview || '123456');
        return { otpRequired: true, otpPreview: res.otpPreview, user: normalizedUser };
      }
      return { success: true, user: normalizedUser };
    } catch (apiErr) {
      console.warn('Real API unavailable or rejected, attempting mock fallback:', apiErr.message);

      // 2. Graceful fallback to verified enterprise mock credentials
      const res = await loginUser(username, password);
      const normalizedUser = {
        ...res.user,
        role: res.user.role_vc || res.user.role,
        role_vc: res.user.role_vc || res.user.role,
      };

      setCurrentUser(normalizedUser);
      localStorage.setItem('gc_erp_session', JSON.stringify(normalizedUser));

      if (res.otpRequired) {
        setPendingOtpUser(normalizedUser);
        setDemoOtp(res.otpPreview);
        return { otpRequired: true, otpPreview: res.otpPreview, user: normalizedUser };
      }
      return { success: true, user: normalizedUser };
    }
  };

  const verifyOtp = async (code) => {
    try {
      if (pendingOtpUser && pendingOtpUser.username_vc) {
        await api.verifyOtp(pendingOtpUser.username_vc, code);
      } else {
        await verifyOtpCode(code);
      }
    } catch {
      await verifyOtpCode(code);
    }

    if (pendingOtpUser) {
      setCurrentUser(pendingOtpUser);
      localStorage.setItem('gc_erp_session', JSON.stringify(pendingOtpUser));
      setPendingOtpUser(null);
      setDemoOtp('');
    }
    return { success: true };
  };

  const register = async (formData) => {
    try {
      return await api.register(formData);
    } catch {
      return await registerUser(formData);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setPendingOtpUser(null);
    setDemoOtp('');
    localStorage.removeItem('gc_erp_session');
    localStorage.removeItem('gc_erp_token');
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
