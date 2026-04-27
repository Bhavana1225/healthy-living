const Plan = require('../models/Plan');

// @desc    Create new plan
// @route   POST /api/plans
// @access  Private
const createPlan = async (req, res) => {
  const { meals, groceryList } = req.body;

  if (meals && meals.length === 0) {
    res.status(400).json({ message: 'No meals provided' });
    return;
  } else {
    try {
      const plan = new Plan({
        user: req.user._id,
        meals,
        groceryList,
      });

      const createdPlan = await plan.save();
      res.status(201).json(createdPlan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Get logged in user plan
// @route   GET /api/plans
// @access  Private
const getMyPlan = async (req, res) => {
  try {
    const plans = await Plan.find({ user: req.user._id }).populate('meals.breakfast meals.lunch meals.dinner meals.snack').sort({ createdAt: -1 });
    // Return latest plan
    res.json(plans.length > 0 ? plans[0] : null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPlan, getMyPlan };
