const express = require('express');
const router = express.Router();
const timesheetController = require('../controllers/timesheetController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', timesheetController.getTimesheets);
router.post('/', authenticateToken, timesheetController.createTimesheet);

router.get('/track', timesheetController.getTimeTracks);
router.post('/track', authenticateToken, timesheetController.createTimeTrack);

module.exports = router;
