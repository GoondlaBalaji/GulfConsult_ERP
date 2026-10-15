const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

// Enterprise Role Guard: Only HR Manager and System Administrator can view/manage salaries & finance
router.get('/salaries', authenticateToken, requireRole('HR Manager'), payrollController.getSalaryMaster);
router.get('/allowances', authenticateToken, requireRole('HR Manager'), payrollController.getAllowances);
router.post('/allowances', authenticateToken, requireRole('HR Manager'), payrollController.createAllowance);
router.get('/deductions', authenticateToken, requireRole('HR Manager'), payrollController.getDeductions);
router.post('/deductions', authenticateToken, requireRole('HR Manager'), payrollController.createDeduction);

module.exports = router;

