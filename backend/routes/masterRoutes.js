const express = require('express');
const router = express.Router();
const masterController = require('../controllers/masterController');

router.get('/companies', masterController.getCompanies);
router.get('/job-titles', masterController.getJobTitles);
router.get('/nationalities', masterController.getNationalities);
router.get('/educations', masterController.getEducations);
router.get('/doc-types', masterController.getDocTypes);
router.get('/leave-types', masterController.getLeaveTypes);
router.get('/job-openings', masterController.getJobOpenings);
router.get('/new-joiners', masterController.getNewJoiners);
router.get('/dashboard-stats', masterController.getDashboardStats);

module.exports = router;
