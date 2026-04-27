const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Meal = require('../models/Meal');
const connectDB = require('../config/db');

dotenv.config();

connectDB();

const sampleMeals = [
  {
    name: 'Oatmeal with Berries',
    type: 'breakfast',
    calories: 300,
    protein: 10,
    carbs: 50,
    fats: 5,
    dietTypes: ['standard', 'vegetarian', 'vegan'],
    suitableConditions: ['high BP', 'diabetes'],
    ingredients: ['Oats', 'Almond Milk', 'Mixed Berries', 'Chia Seeds'],
    prepTime: 10,
    steps: ['Cook oats in almond milk', 'Top with berries and chia seeds']
  },
  {
    name: 'Grilled Chicken Salad',
    type: 'lunch',
    calories: 400,
    protein: 35,
    carbs: 15,
    fats: 15,
    dietTypes: ['standard', 'high protein', 'keto'],
    suitableConditions: ['weight loss', 'diabetes'],
    ingredients: ['Chicken Breast', 'Mixed Greens', 'Olive Oil', 'Cherry Tomatoes'],
    prepTime: 20,
    steps: ['Grill chicken', 'Toss greens with oil and tomatoes', 'Slice chicken on top']
  },
  {
    name: 'Quinoa Bowl with Roasted Veggies',
    type: 'dinner',
    calories: 450,
    protein: 15,
    carbs: 65,
    fats: 12,
    dietTypes: ['standard', 'vegetarian', 'vegan'],
    suitableConditions: ['high BP'],
    ingredients: ['Quinoa', 'Sweet Potato', 'Broccoli', 'Tahini'],
    prepTime: 30,
    steps: ['Roast veggies', 'Cook quinoa', 'Assemble bowl and drizzle tahini']
  },
  {
    name: 'Protein Shake',
    type: 'snack',
    calories: 250,
    protein: 30,
    carbs: 20,
    fats: 5,
    dietTypes: ['standard', 'vegetarian', 'high protein'],
    ingredients: ['Protein Powder', 'Banana', 'Water', 'Peanut Butter'],
    prepTime: 5,
    steps: ['Blend all ingredients']
  }
];

const importData = async () => {
  try {
    await Meal.deleteMany();
    await User.deleteMany();

    await Meal.insertMany(sampleMeals);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
    // Optionally handle destroy data
} else {
  importData();
}
