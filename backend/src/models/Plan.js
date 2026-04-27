const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  meals: [{
    day: { type: String, required: true }, // e.g., 'Monday'
    breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' },
    lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' },
    dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' },
    snack: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }
  }],
  groceryList: [{
    item: { type: String },
    amount: { type: String }
  }]
}, { timestamps: true });

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;
