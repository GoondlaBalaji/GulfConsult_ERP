import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Sliding 2D translation panel state matching acmenlei/login-form
  // false = Sign In active, true = Sign Up (right-panel-active)
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    username: 'admin',
    password: 'admin123',
  });

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    code: '',
  });

  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  // Supabase Click-to-Verify Email Link State
  const [emailLinkConfirmed, setEmailLinkConfirmed] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState('');
  const [supabaseAccessToken, setSupabaseAccessToken] = useState('');

  // Detect email link confirmation callback from Supabase or onboarding welcome link
  React.useEffect(() => {
    // 1. Check query parameters (e.g. from Onboarding Welcome Email ?ecode=1041&email=...)
    const urlParams = new URLSearchParams(window.location.search);
    const ecodeParam = urlParams.get('ecode');
    const emailParam = urlParams.get('email');
    if (ecodeParam || emailParam) {
      setIsRightPanelActive(true);
      setSignUpData((prev) => ({
        ...prev,
        email: emailParam || prev.email,
        username: emailParam ? emailParam.split('@')[0] : prev.username,
      }));
      setInfoMessage(`👋 Welcome to Gulf Consult! Employee ID: #${ecodeParam || ''}. Click "Send Verification" to activate your account.`);
    }

    // 2. Check hash for Supabase Click-to-Verify link
    const hash = window.location.hash;
    if (hash && (hash.includes('access_token=') || hash.includes('type=signup') || hash.includes('type=magiclink'))) {
      const params = new URLSearchParams(hash.replace(/^#/, ''));
      const token = params.get('access_token');
      if (token) {
        setSupabaseAccessToken(token);
        try {
          const payloadBase64 = token.split('.')[1];
          const payload = JSON.parse(atob(payloadBase64));
          if (payload && payload.email) {
            setConfirmedEmail(payload.email);
            setSignUpData((prev) => ({
              ...prev,
              email: payload.email,
              username: prev.username || payload.email.split('@')[0],
            }));
            setEmailLinkConfirmed(true);
            setIsRightPanelActive(true);
            setInfoMessage(`✅ Official email verified: ${payload.email}! Please set your username and password below to activate your account.`);
          }
        } catch (e) {
          console.error('Failed to parse token payload:', e);
        }
      }
    }
  }, []);


  // Quick 1-click Demo credentials
  const setDemoUser = (user, pass) => {
    setSignInData({ username: user, password: pass });
    setError('');
  };

  // Sign In Submit
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    setLoading(true);

    try {
      const res = await login(signInData.username, signInData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  // Send Real Verification Code via Email
  // Send Real Verification Code via Email or Employee ID
  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!signUpData.email) {
      setError('Please enter your Official Email or Employee ID first.');
      return;
    }
    setError('');
    setInfoMessage('');
    setSendingCode(true);

    try {
      const res = await api.sendRegisterOtp(signUpData.email);
      setCodeSent(true);
      if (res.ecode_nu) {
        setInfoMessage(res.message || `Verification dispatched to ${res.email_vc}! (Employee ID: #${res.ecode_nu})`);
        if (res.email_vc) {
          setSignUpData((prev) => ({ ...prev, email: res.email_vc, code: '' }));
        }
      } else {
        setInfoMessage(res.message || 'Verification code sent to your email! Please check your Inbox (or Spam/Junk folder).');
        setSignUpData((prev) => ({ ...prev, code: '' }));
      }
    } catch (err) {
      setError(err.message || 'Failed to dispatch verification email.');
    } finally {
      setSendingCode(false);
    }
  };


  // Sign Up Submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    setLoading(true);

    try {
      if (!signUpData.username || !signUpData.email || !signUpData.password || !signUpData.confirmPassword) {
        throw new Error('Please fill in all fields.');
      }
      if (signUpData.password !== signUpData.confirmPassword) {
        throw new Error('Passwords do not match. Please re-enter your password.');
      }
      if (signUpData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }
      if (emailLinkConfirmed) {
        await api.completeLinkRegistration({
          username: signUpData.username,
          password: signUpData.password,
          accessToken: supabaseAccessToken,
          email: confirmedEmail || signUpData.email,
        });
        await login(signUpData.username, signUpData.password);
        navigate('/dashboard');
        return;
      }

      if (!signUpData.code) {
        throw new Error('Please enter the 6-digit verification code sent to your email.');
      }

      await api.register({
        username: signUpData.username,
        email: signUpData.email,
        password: signUpData.password,
        confirmPassword: signUpData.confirmPassword,
        code: signUpData.code,
      });

      // Automatically log the newly registered user in
      await login(signUpData.username, signUpData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="acme-body-wrapper">
      <div
        className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}
        id="container"
      >
        {/* ==================== 1. SIGN UP (REGISTRATION) FORM ==================== */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1>User Registration</h1>

            {/* 4 Social Icons */}
            <div className="social-container">
              <a href="#qq" onClick={(e) => e.preventDefault()} className="social" title="QQ">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 2.85 1.2 5.42 3.12 7.24-.07-.56-.12-1.22-.12-1.99 0-3.58 2.37-4.49 3.5-4.49.52 0 .93.18 1.5.49.58-.31.98-.49 1.5-.49 1.13 0 3.5.91 3.5 4.49 0 .77-.05 1.43-.12 1.99C18.8 17.42 20 14.85 20 12c0-5.52-4.48-10-10-10z" />
                </svg>
              </a>
              <a href="#wechat" onClick={(e) => e.preventDefault()} className="social" title="WeChat">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M8.5 4C4.91 4 2 6.46 2 9.5c0 1.74.96 3.29 2.45 4.31L4 16.5l3.05-1.52c.46.13.94.2 1.45.2.22 0 .43-.02.64-.04C8.75 14.5 8.5 13.78 8.5 13c0-3.31 3.13-6 7-6 .5 0 .98.05 1.44.15C16.14 4.88 12.59 4 8.5 4zm-2 3a1 1 0 110 2 1 1 0 010-2zm4 0a1 1 0 110 2 1 1 0 010-2zm5 5c-3.04 0-5.5 2.01-5.5 4.5S12.46 21 15.5 21c.42 0 .82-.05 1.2-.15l2.5 1.25-.65-2.2c1.17-.83 1.95-2.07 1.95-3.4 0-2.49-2.46-4.5-5.5-4.5zm-2 2a.75.75 0 110 1.5.75.75 0 010-1.5zm3.5 0a.75.75 0 110 1.5.75.75 0 010-1.5z" />
                </svg>
              </a>
              <a href="#weibo" onClick={(e) => e.preventDefault()} className="social" title="Weibo">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-3.1 0-5.5-1.5-5.5-3.3 0-1.9 2.5-3.3 5.5-3.3 3.1 0 5.5 1.5 5.5 3.3 0 1.8-2.4 3.3-5.5 3.3zm2.5-4.5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5z" />
                </svg>
              </a>
              <a href="#github" onClick={(e) => e.preventDefault()} className="social" title="GitHub">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>

            <span style={{ fontSize: '11px', color: '#475569', textAlign: 'center', lineHeight: '1.4' }}>
              {emailLinkConfirmed
                ? 'Official email confirmed! Complete your username & password to finish activation.'
                : 'Registered employees only: enter your official corporate email to receive your verification email and set your password.'}
            </span>

            {emailLinkConfirmed && (
              <div style={{ background: '#ecfdf5', color: '#065f46', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', margin: '4px 0', border: '1px solid #a7f3d0', width: '100%', boxSizing: 'border-box', textAlign: 'center' }}>
                ✅ Verified: {confirmedEmail || signUpData.email}
              </div>
            )}

            {error && isRightPanelActive && (
              <span style={{ color: '#e11d48', fontSize: '11px', margin: '2px 0' }}>{error}</span>
            )}

            <input
              type="text"
              required
              placeholder="Username"
              value={signUpData.username}
              onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
            />
            <input
              type="email"
              required
              disabled={emailLinkConfirmed}
              placeholder="Official Email"
              value={signUpData.email}
              onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={signUpData.password}
              onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
            />
            <input
              type="password"
              required
              placeholder="Confirm Password"
              value={signUpData.confirmPassword}
              onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
            />

            {infoMessage && isRightPanelActive && (
              <span style={{ color: '#059669', fontSize: '11px', margin: '2px 0' }}>{infoMessage}</span>
            )}

            {!emailLinkConfirmed && (
              <>
                <button type="button" id="send_code" onClick={handleSendCode} disabled={sendingCode}>
                  {sendingCode ? 'Sending Verification...' : codeSent ? 'Resend Verification' : 'Send Verification'}
                </button>

                <input
                  type="text"
                  placeholder="Verification Code (optional if clicked link)"
                  value={signUpData.code}
                  onChange={(e) => setSignUpData({ ...signUpData, code: e.target.value })}
                />
              </>
            )}

            <button type="submit" disabled={loading}>
              {loading ? '...' : emailLinkConfirmed ? 'Activate ERP Account & Login' : 'Register'}
            </button>
          </form>
        </div>


        {/* ==================== 2. SIGN IN FORM ==================== */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignIn}>
            <h1>User Login</h1>

            {/* 4 Social Icons */}
            <div className="social-container">
              <a href="#qq" onClick={(e) => e.preventDefault()} className="social" title="QQ">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 2.85 1.2 5.42 3.12 7.24-.07-.56-.12-1.22-.12-1.99 0-3.58 2.37-4.49 3.5-4.49.52 0 .93.18 1.5.49.58-.31.98-.49 1.5-.49 1.13 0 3.5.91 3.5 4.49 0 .77-.05 1.43-.12 1.99C18.8 17.42 20 14.85 20 12c0-5.52-4.48-10-10-10z" />
                </svg>
              </a>
              <a href="#wechat" onClick={(e) => e.preventDefault()} className="social" title="WeChat">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M8.5 4C4.91 4 2 6.46 2 9.5c0 1.74.96 3.29 2.45 4.31L4 16.5l3.05-1.52c.46.13.94.2 1.45.2.22 0 .43-.02.64-.04C8.75 14.5 8.5 13.78 8.5 13c0-3.31 3.13-6 7-6 .5 0 .98.05 1.44.15C16.14 4.88 12.59 4 8.5 4zm-2 3a1 1 0 110 2 1 1 0 010-2zm4 0a1 1 0 110 2 1 1 0 010-2zm5 5c-3.04 0-5.5 2.01-5.5 4.5S12.46 21 15.5 21c.42 0 .82-.05 1.2-.15l2.5 1.25-.65-2.2c1.17-.83 1.95-2.07 1.95-3.4 0-2.49-2.46-4.5-5.5-4.5zm-2 2a.75.75 0 110 1.5.75.75 0 010-1.5zm3.5 0a.75.75 0 110 1.5.75.75 0 010-1.5z" />
                </svg>
              </a>
              <a href="#weibo" onClick={(e) => e.preventDefault()} className="social" title="Weibo">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-3.1 0-5.5-1.5-5.5-3.3 0-1.9 2.5-3.3 5.5-3.3 3.1 0 5.5 1.5 5.5 3.3 0 1.8-2.4 3.3-5.5 3.3zm2.5-4.5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5z" />
                </svg>
              </a>
              <a href="#github" onClick={(e) => e.preventDefault()} className="social" title="GitHub">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>

            <span>You can choose from the above methods to login to your account!</span>

            {/* Quick Demo Helper */}
            <div className="acme-demo-bar">
              <span
                onClick={() => setDemoUser('admin', 'admin123')}
                className="acme-demo-chip"
                title="System Administrator (Full Access)"
              >
                admin
              </span>
              <span
                onClick={() => setDemoUser('hr_manager', 'hr123')}
                className="acme-demo-chip"
                title="HR Manager (HRMS & Payroll)"
              >
                hr_manager
              </span>
              <span
                onClick={() => setDemoUser('pm_expert', 'pm123')}
                className="acme-demo-chip"
                title="Project Manager (TSMS & Projects)"
              >
                pm_expert
              </span>
              <span
                onClick={() => setDemoUser('sarah_j', 'gc123456')}
                className="acme-demo-chip"
                title="Standard Employee (Timesheet & Profile)"
              >
                employee
              </span>
            </div>

            {error && !isRightPanelActive && (
              <span style={{ color: '#e11d48', fontSize: '11px', margin: '2px 0' }}>{error}</span>
            )}

            <input
              type="text"
              required
              placeholder="Employee ID / Official Email / Username"
              value={signInData.username}
              onChange={(e) => setSignInData({ ...signInData, username: e.target.value })}
            />

            <input
              type="password"
              required
              placeholder="Password"
              value={signInData.password}
              onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
            />

            <a
              href="#forgot"
              onClick={(e) => {
                e.preventDefault();
                setDemoUser('admin', 'admin123');
              }}
            >
              Forgot password?
            </a>

            <button type="submit" disabled={loading}>
              {loading ? '...' : 'Login'}
            </button>
          </form>
        </div>

        {/* ==================== 3. 2D SLIDING OVERLAY CONTAINER ==================== */}
        <div className="overlay-container">
          <div className="overlay">
            {/* Left Overlay Panel (Visible when Registration is active) */}
            <div className="overlay-panel overlay-left">
              <h1>Already have an account?</h1>
              <p>Dear, click here to log in quickly.</p>
              <button
                type="button"
                className="ghost"
                id="signIn"
                onClick={() => {
                  setIsRightPanelActive(false);
                  setError('');
                }}
              >
                Login
              </button>
            </div>

            {/* Right Overlay Panel (Visible when Login is active) */}
            <div className="overlay-panel overlay-right">
              <h1>Don't have an account?</h1>
              <p>Click register to create an account of your own.</p>
              <button
                type="button"
                className="ghost"
                id="signUp"
                onClick={() => {
                  setIsRightPanelActive(true);
                  setError('');
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
