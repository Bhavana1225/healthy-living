const express = require('express');
const router = express.Router();
const { getMeals, getMealById, getRecommendations } = require('../controllers/mealController');

router.route('/').get(getMeals);
router.route('/recommendations').get(getRecommendations);
router.route('/:id').get(getMealById);

module.exports = router;
