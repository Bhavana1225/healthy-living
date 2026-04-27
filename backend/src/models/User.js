const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    enum: ['weight loss', 'muscle gain', 'general health'],
    default: 'general health'
  },
  dietType: {
    type: String,
    enum: ['standard', 'vegetarian', 'vegan', 'high protein', 'keto'],
    default: 'standard'
  },
  healthCondition: {
    type: String,
    enum: ['none', 'diabetes', 'high BP'],
    default: 'none'
  }
}, { timestamps: true });

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
