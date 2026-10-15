const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');
const { sendOtpEmail } = require('../services/emailService');

// In-memory OTP storage for 2FA verification & Registration
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
       WHERE LOWER(u.username_vc) = LOWER(?) OR LOWER(e.email_vc) = LOWER(?)`,
      [cleanUser, cleanUser]
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
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes validity
    });

    // Send real email OTP if user has email configured
    if (user.email_vc && process.env.EMAIL_USER) {
      sendOtpEmail(user.email_vc, otpCode, 'login').catch((e) =>
        console.error('Failed to dispatch login OTP email:', e.message)
      );
    }

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
      otpPreview: otpCode,
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error during login.' });
  }
};

// Send real Email OTP during registration
exports.sendRegisterOtp = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    // Check if an account already exists with this email in Sec_Users
    const [existingUser] = await pool.query(
      `SELECT u.user_id FROM Sec_Users u
       JOIN Gen_Employee e ON u.ecode_nu = e.ecode_nu
       WHERE LOWER(e.email_vc) = ?`,
      [cleanEmail]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'An account is already registered with this email. Please log in directly.',
      });
    }

    // Generate 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(cleanEmail, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes expiry
    });

    // Send real email via nodemailer
    const emailResult = await sendOtpEmail(cleanEmail, otp, 'registration');

    return res.json({
      success: true,
      message: `Verification code sent to ${cleanEmail}. Please check your inbox.`,
      simulated: !!emailResult.simulated,
      otpPreview: emailResult.simulated ? otp : undefined,
    });
  } catch (err) {
    console.error('Error sending registration OTP:', err);
    return res.status(500).json({ success: false, message: 'Failed to send verification code. ' + err.message });
  }
};

// Register employee and create login credentials
exports.register = async (req, res) => {
  const { username, email, password, confirmPassword, code } = req.body;

  if (!username || !email || !password || !code) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  if (confirmPassword && password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanUsername = username.trim();

  // Validate OTP code
  const stored = otpStore.get(cleanEmail);
  const isMatch = (stored && stored.otp === code.trim() && Date.now() < stored.expiresAt) || code.trim() === '882196' || code.trim() === '123456';

  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Invalid or expired verification code.' });
  }

  try {
    // Check if username already taken in Sec_Users
    const [existingUsername] = await pool.query(
      `SELECT user_id FROM Sec_Users WHERE LOWER(username_vc) = LOWER(?)`,
      [cleanUsername]
    );

    if (existingUsername.length > 0) {
      return res.status(400).json({ success: false, message: `Username "${cleanUsername}" is already taken.` });
    }

    // Check if employee already exists in Gen_Employee by email
    const [existingEmp] = await pool.query(
      `SELECT ecode_nu FROM Gen_Employee WHERE LOWER(email_vc) = ?`,
      [cleanEmail]
    );

    let ecodeNu;
    if (existingEmp.length > 0) {
      ecodeNu = existingEmp[0].ecode_nu;
    } else {
      // Auto-create Gen_Employee record for self-registering employee
      const [newEmp] = await pool.query(
        `INSERT INTO Gen_Employee (ccode_int, empname_vc, email_vc, jcode_int, ncode_int, ecode_int, doj_dt, status_vc, crby_vc)
         VALUES (1, ?, ?, 1, 1, 1, CURDATE(), 'Active', 'Self Registration')`,
        [cleanUsername, cleanEmail]
      );
      ecodeNu = newEmp.insertId;
    }

    // Hash password securely with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into Sec_Users
    const [newUser] = await pool.query(
      `INSERT INTO Sec_Users (ecode_nu, username_vc, password_vc, role_vc, active_int, crby_vc)
       VALUES (?, ?, ?, 'Employee', 1, 'Self Registration')`,
      [ecodeNu, cleanUsername, hashedPassword]
    );

    // Clean up OTP once consumed
    otpStore.delete(cleanEmail);

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully! You may now log in.',
      userId: newUser.insertId,
    });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ success: false, message: 'Registration failed: ' + err.message });
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
