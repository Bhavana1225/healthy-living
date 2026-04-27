const express = require('express');
const router = express.Router();
const { createPlan, getMyPlan } = require('../controllers/planController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createPlan).get(protect, getMyPlan);

module.exports = router;
