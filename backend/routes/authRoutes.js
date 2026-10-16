const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/send-register-otp', authController.sendRegisterOtp);
router.post('/register', authController.register);
router.post('/complete-link-registration', authController.completeLinkRegistration);
router.post('/verify-otp', authController.verifyOtp);
router.get('/me', authenticateToken, authController.getMe);
router.get('/users', authenticateToken, requireRole('System Administrator'), authController.getUsers);
router.patch('/users/:id/status', authenticateToken, requireRole('System Administrator'), authController.updateUserStatus);
router.patch('/users/:id/role', authenticateToken, requireRole('System Administrator'), authController.updateUserRole);

module.exports = router;

