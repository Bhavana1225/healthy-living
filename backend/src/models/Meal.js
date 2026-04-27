const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  dietTypes: [{ type: String }], // e.g., 'vegetarian', 'vegan', 'high protein'
  suitableConditions: [{ type: String }], // e.g., 'diabetes', 'high BP'
  unsuitableConditions: [{ type: String }],
  ingredients: [{ type: String }],
  prepTime: { type: Number }, // in minutes
  steps: [{ type: String }],
  image: { type: String }
}, { timestamps: true });

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;
