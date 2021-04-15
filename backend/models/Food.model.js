const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    foodName: {
      type: String,
      required: [true, 'Please enter the food name'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter the food price'],
    },
    category: {
      type: String,
      required: [true, 'Please enter the food category'],
    },
    tags: [String],
    image: {
      type: String,
      required: [true, 'Please add food item image'],
    },
    description: String,
    availableOn: {
      type: [String],
      enum: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Food = mongoose.model('Food', foodSchema);
