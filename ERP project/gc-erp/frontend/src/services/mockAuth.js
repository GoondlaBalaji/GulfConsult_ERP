// Mock Authentication Service for Phase 1 Frontend UI

const INITIAL_USERS = [
  {
    user_id: 1,
    ecode_nu: 1001,
    username_vc: 'admin',
    password_vc: 'admin123',
    empname_vc: 'Goondla Balaji',
    email_vc: 'admin@gulfconsult.com',
    role_vc: 'System Administrator',
    department: 'Executive Management',
    active_int: 1,
  },
  {
    user_id: 2,
    ecode_nu: 1002,
    username_vc: 'hr_manager',
    password_vc: 'hr123',
    empname_vc: 'Fatima Al-Mansoor',
    email_vc: 'fatima.hrms@gulfconsult.com',
    role_vc: 'HR Manager',
    department: 'Human Resources',
    active_int: 1,
  },
  {
    user_id: 3,
    ecode_nu: 1003,
    username_vc: 'pm_expert',
    password_vc: 'pm123',
    empname_vc: 'Tariq Rashid',
    email_vc: 'tariq.pm@gulfconsult.com',
    role_vc: 'Project Manager',
    department: 'Engineering & Operations',
    active_int: 1,
  },
];

export const getStoredUsers = () => {
  const users = localStorage.getItem('gc_erp_users');
  if (!users) {
    localStorage.setItem('gc_erp_users', JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }
  try {
    const parsed = JSON.parse(users);
    // Ensure default initial users (admin, hr_manager, pm_expert) are present
    for (const initU of INITIAL_USERS) {
      if (!parsed.some((u) => u.username_vc.toLowerCase() === initU.username_vc.toLowerCase())) {
        parsed.unshift(initU);
      }
    }
    return parsed;
  } catch (e) {
    localStorage.setItem('gc_erp_users', JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }
};

export const saveUsers = (users) => {
  localStorage.setItem('gc_erp_users', JSON.stringify(users));
};

export const loginUser = async (username, password) => {
  const cleanUsername = (username || '').trim();

  // 1. Authenticate with Live Render Backend & TiDB Cloud
  try {
    const API_URL =
      import.meta.env.VITE_API_BASE_URL || 'https://gulfconsult-erp-backend.onrender.com/api';
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: cleanUsername, password }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      if (data.token) {
        localStorage.setItem('gc_erp_token', data.token);
      }
      return {
        success: true,
        user: {
          user_id: data.user.user_id,
          ecode_nu: data.user.ecode_nu,
          username_vc: data.user.username_vc,
          empname_vc: data.user.empname_vc,
          email_vc: data.user.email_vc,
          role_vc: data.user.role_vc,
          department: data.user.company_name || 'Gulf Consult',
        },
        otpRequired: false,
        otpPreview: data.otpPreview || '123456',
      };
    } else if (res.status === 401 || res.status === 403) {
      throw new Error(data.message || 'Invalid username or password. Please check your credentials.');
    }
  } catch (apiErr) {
    if (
      apiErr.message.includes('Invalid username') ||
      apiErr.message.includes('suspended') ||
      apiErr.message.includes('inactive')
    ) {
      throw apiErr;
    }
    console.warn('Live API request notice:', apiErr.message);
  }

  // 2. Local Fallback
  await new Promise((res) => setTimeout(res, 300));
  const users = getStoredUsers();
  const user = users.find(
    (u) =>
      u.username_vc.toLowerCase() === cleanUsername.toLowerCase() &&
      u.password_vc === password
  );

  if (!user) {
    throw new Error('Invalid username or password. Please check your credentials.');
  }

  if (user.active_int !== 1) {
    throw new Error('Your user account is suspended or inactive. Contact administrator.');
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  sessionStorage.setItem('pending_otp', JSON.stringify({ username: user.username_vc, otp: otpCode }));

  return {
    success: true,
    user: {
      user_id: user.user_id,
      ecode_nu: user.ecode_nu,
      username_vc: user.username_vc,
      empname_vc: user.empname_vc,
      email_vc: user.email_vc,
      role_vc: user.role_vc,
      department: user.department,
    },
    otpRequired: false,
    otpPreview: otpCode,
  };
};

export const registerUser = async (formData) => {
  await new Promise((res) => setTimeout(res, 700));

  const users = getStoredUsers();
  
  const existing = users.find(
    (u) => u.username_vc.toLowerCase() === formData.username_vc.toLowerCase()
  );

  if (existing) {
    throw new Error(`Username "${formData.username_vc}" is already taken.`);
  }

  const existingEmail = users.find(
    (u) => u.email_vc && u.email_vc.toLowerCase() === formData.email_vc.toLowerCase()
  );

  if (existingEmail) {
    throw new Error(`Email address "${formData.email_vc}" is already registered.`);
  }

  const newUser = {
    user_id: users.length + 1,
    ecode_nu: parseInt(formData.ecode_nu) || 1000 + users.length + 1,
    username_vc: formData.username_vc.trim(),
    password_vc: formData.password_vc,
    empname_vc: formData.empname_vc.trim(),
    email_vc: formData.email_vc.trim(),
    role_vc: formData.role_vc || 'Employee',
    department: formData.department || 'General Staff',
    active_int: 1,
    crdate_dt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  return {
    success: true,
    message: 'User registration successful! You can now log in.',
    user: newUser,
  };
};

export const sendRegisterOtp = async (email_vc, username_vc) => {
  await new Promise((res) => setTimeout(res, 500));

  const users = getStoredUsers();
  
  const existing = users.find(
    (u) => u.username_vc.toLowerCase() === username_vc.toLowerCase()
  );

  if (existing) {
    throw new Error(`Username "${username_vc}" is already taken.`);
  }

  const existingEmail = users.find(
    (u) => u.email_vc && u.email_vc.toLowerCase() === email_vc.toLowerCase()
  );

  if (existingEmail) {
    throw new Error(`Email address "${email_vc}" is already registered.`);
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  sessionStorage.setItem('pending_register_otp', JSON.stringify({ email: email_vc, otp: otpCode }));

  return {
    success: true,
    otpPreview: otpCode,
  };
};

export const verifyRegisterOtp = async (enteredOtp) => {
  await new Promise((res) => setTimeout(res, 400));

  const storedOtpData = JSON.parse(sessionStorage.getItem('pending_register_otp') || '{}');

  if (!storedOtpData.otp) {
    throw new Error('No pending registration OTP session found. Please request a new code.');
  }

  if (storedOtpData.otp !== enteredOtp.trim()) {
    throw new Error('Invalid OTP verification code. Please check your email or enter demo code.');
  }

  sessionStorage.removeItem('pending_register_otp');
  return { success: true };
};

export const verifyOtpCode = async (enteredOtp) => {
  await new Promise((res) => setTimeout(res, 500));

  const storedOtpData = JSON.parse(sessionStorage.getItem('pending_otp') || '{}');

  if (!storedOtpData.otp) {
    throw new Error('No pending OTP session found. Please login again.');
  }

  if (storedOtpData.otp !== enteredOtp.trim()) {
    throw new Error('Invalid OTP verification code. Please check your email or enter demo code.');
  }

  sessionStorage.removeItem('pending_otp');
  return { success: true };
};
