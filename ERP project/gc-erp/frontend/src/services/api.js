// Gulf Consult ERP - Production API Service connecting to Render Backend & TiDB Cloud

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://gulfconsult-erp-backend.onrender.com/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('gc_erp_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Auth endpoints
  async login(username, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    if (data.token) {
      localStorage.setItem('gc_erp_token', data.token);
    }
    return data;
  },

  async sendRegisterOtp(email) {
    const res = await fetch(`${API_BASE_URL}/auth/send-register-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to send OTP code.');
    return data;
  },

  async register(formData) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed.');
    return data;
  },

  async verifyOtp(username, otp) {
    const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, otp }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'OTP verification failed');
    return data;
  },

  async getMe() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async getUsers() {
    const res = await fetch(`${API_BASE_URL}/auth/users`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async updateUserStatus(id, active) {
    const res = await fetch(`${API_BASE_URL}/auth/users/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ active }),
    });
    return await res.json();
  },

  async updateUserRole(id, role) {
    const res = await fetch(`${API_BASE_URL}/auth/users/${id}/role`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ role }),
    });
    return await res.json();
  },


  // Dashboard Stats
  async getDashboardStats() {
    const res = await fetch(`${API_BASE_URL}/masters/dashboard-stats`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  // Employees
  async getEmployees(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/employees?${query}`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async getEmployeeMetrics() {
    const res = await fetch(`${API_BASE_URL}/employees/metrics`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  // Projects
  async getProjects(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/projects?${query}`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  // Timesheets
  async getTimesheets() {
    const res = await fetch(`${API_BASE_URL}/timesheets`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  // Payroll
  async getSalaries() {
    const res = await fetch(`${API_BASE_URL}/payroll/salaries`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async getAllowances() {
    const res = await fetch(`${API_BASE_URL}/payroll/allowances`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async getDeductions() {
    const res = await fetch(`${API_BASE_URL}/payroll/deductions`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  // Masters
  async getJobOpenings() {
    const res = await fetch(`${API_BASE_URL}/masters/job-openings`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async getNewJoiners() {
    const res = await fetch(`${API_BASE_URL}/masters/new-joiners`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },
};
