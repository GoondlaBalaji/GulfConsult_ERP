const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/salaries', payrollController.getSalaryMaster);
router.get('/allowances', payrollController.getAllowances);
router.post('/allowances', authenticateToken, payrollController.createAllowance);
router.get('/deductions', payrollController.getDeductions);
router.post('/deductions', authenticateToken, payrollController.createDeduction);

module.exports = router;
