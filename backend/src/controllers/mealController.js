const Meal = require('../models/Meal');

// @desc    Fetch all meals
// @route   GET /api/meals
// @access  Public
const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({});
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single meal
// @route   GET /api/meals/:id
// @access  Public
const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (meal) {
      res.json(meal);
    } else {
      res.status(404).json({ message: 'Meal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get meal recommendations based on query params (goal, diet, condition)
// @route   GET /api/meals/recommendations
// @access  Public
const getRecommendations = async (req, res) => {
  const { goal, dietType, healthCondition } = req.query;

  let query = {};

  if (dietType && dietType !== 'standard') {
    query.dietTypes = dietType;
  }

  // Very simple recommendation logic for MVP
  // If weight loss, prefer meals < 500 calories
  // If muscle gain, prefer high protein > 30g

  try {
    let meals = await Meal.find(query);
    
    if (goal === 'weight loss') {
        meals = meals.filter(m => m.calories < 600);
    } else if (goal === 'muscle gain') {
        meals = meals.filter(m => m.protein > 25);
    }

    if (healthCondition && healthCondition !== 'none') {
        meals = meals.filter(m => {
            if (m.unsuitableConditions && m.unsuitableConditions.includes(healthCondition)) {
                return false;
            }
            return true;
        });
    }

    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMeals, getMealById, getRecommendations };
