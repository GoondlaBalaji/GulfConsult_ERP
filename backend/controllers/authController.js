const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');

// In-memory OTP storage for 2FA verification
const otpStore = new Map();

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  try {
    const cleanUser = username.trim();
    const [rows] = await pool.query(
      `SELECT u.user_id, u.ecode_nu, u.username_vc, u.password_vc, u.role_vc, u.active_int,
              e.empname_vc, e.email_vc, e.mobile_vc, c.cname_vc AS company_name
       FROM Sec_Users u
       LEFT JOIN Gen_Employee e ON u.ecode_nu = e.ecode_nu
       LEFT JOIN Gen_Company c ON e.ccode_int = c.ccode_int
       WHERE LOWER(u.username_vc) = LOWER(?)`,
      [cleanUser]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }

    const user = rows[0];

    if (user.active_int !== 1) {
      return res.status(403).json({ success: false, message: 'User account is inactive. Contact Administrator.' });
    }

    // Support both bcrypt-hashed and seed plain text passwords
    let passwordMatches = false;
    if (user.password_vc.startsWith('$2a$') || user.password_vc.startsWith('$2b$')) {
      passwordMatches = await bcrypt.compare(password, user.password_vc);
    } else {
      passwordMatches = user.password_vc === password;
    }

    if (!passwordMatches) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }

    // Generate 6-digit OTP code for 2FA
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(user.username_vc.toLowerCase(), {
      otp: otpCode,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes validity
    });

    // Generate JWT Token
    const token = jwt.sign(
      {
        user_id: user.user_id,
        ecode_nu: user.ecode_nu,
        username_vc: user.username_vc,
        role_vc: user.role_vc,
        empname_vc: user.empname_vc,
        email_vc: user.email_vc,
      },
      process.env.JWT_SECRET || 'gc_erp_super_secret_jwt_key_2026_balaji',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.json({
      success: true,
      message: 'Authentication successful',
      token,
      user: {
        user_id: user.user_id,
        ecode_nu: user.ecode_nu,
        username_vc: user.username_vc,
        empname_vc: user.empname_vc || user.username_vc,
        email_vc: user.email_vc,
        role_vc: user.role_vc,
        company_name: user.company_name || 'Gulf Consult',
      },
      otpRequired: false,
      otpPreview: otpCode, // Provided for convenience
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error during login.' });
  }
};

exports.verifyOtp = async (req, res) => {
  const { username, otp } = req.body;

  if (!username || !otp) {
    return res.status(400).json({ success: false, message: 'Username and OTP are required.' });
  }

  // Allow default test OTP 123456 or stored OTP
  const stored = otpStore.get(username.toLowerCase());
  const isValid = (stored && stored.otp === otp.trim()) || otp.trim() === '123456';

  if (!isValid) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP code.' });
  }

  // Clear OTP once used
  otpStore.delete(username.toLowerCase());

  return res.json({
    success: true,
    message: 'OTP verified successfully.',
  });
};

exports.getMe = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.user_id, u.ecode_nu, u.username_vc, u.role_vc, u.active_int,
              e.empname_vc, e.email_vc, e.mobile_vc, e.gender_vc, e.doj_dt,
              j.jtitle_vc, c.cname_vc
       FROM Sec_Users u
       LEFT JOIN Gen_Employee e ON u.ecode_nu = e.ecode_nu
       LEFT JOIN Gen_JobTitles j ON e.jcode_int = j.jcode_int
       LEFT JOIN Gen_Company c ON e.ccode_int = c.ccode_int
       WHERE u.user_id = ?`,
      [req.user.user_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.json({ success: true, user: rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.user_id, u.ecode_nu, u.username_vc, u.role_vc, u.active_int, u.crdate_dt,
              e.empname_vc, e.email_vc, e.mobile_vc, j.jtitle_vc, c.cname_vc
       FROM Sec_Users u
       LEFT JOIN Gen_Employee e ON u.ecode_nu = e.ecode_nu
       LEFT JOIN Gen_JobTitles j ON e.jcode_int = j.jcode_int
       LEFT JOIN Gen_Company c ON e.ccode_int = c.ccode_int
       ORDER BY u.user_id ASC`
    );
    return res.json({ success: true, count: rows.length, users: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
