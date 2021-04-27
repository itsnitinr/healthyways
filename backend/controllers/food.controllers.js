const asyncHandler = require("express-async-handler");
const getDay = require("../utils/getDay.utils");
const Food = require("../models/Food.model");
const User = require("../models/User.model");

// @route   GET /api/foods
// @desc    Get food item
// @access  Public
exports.getFoodItems = asyncHandler(async (req, res) => {
  const foods = await Food.find({});
  res.status(200).json({ foods });
});

// @route   GET /api/foods/radius
// @desc    Get food item within a radius
// @access  Public
exports.getFoodItemsAdvanced = asyncHandler(async (req, res) => {
  const { latitude, longitude } = req.body;
  const radius = 10 / 6378;

  // Filter chefs in 10km radius
  const chefs = await User.find({
    location: {
      $geoWithin: {
        $centerSphere: [[longitude, latitude], radius],
      },
    },
    isChef: true,
  });

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 15;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Food.countDocuments();

  // Finds items available today
  const dayOfWeek = new Date().getDay();
  const today = getDay(dayOfWeek);

  // Search by query
  const query = req.query.search
    ? {
        foodName: {
          $regex: req.query.search,
          $options: "i",
        },
        chef: { $in: chefs },
        availableOn: today,
      }
    : {
        chef: { $in: chefs },
        availableOn: today,
      };

  const foods = await Food.find({ ...query })
    .skip(startIndex)
    .limit(limit)
    .populate("chef");

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.json({ pagination, foods });
});

// @route   POST /api/foods/
// @desc    Post food item
// @access  Private
exports.addFoodItem = asyncHandler(async (req, res) => {
  const {
    foodName,
    price,
    category,
    tags,
    description,
    availableOn,
  } = req.body;

  const availableOnArray = availableOn.split(",");
  const tagsArray = tags.split(",");

  const chef = await User.findById(req.user.id);

  const food = await Food.create({
    chef: req.user.id,
    foodName,
    price,
    category,
    tags: tagsArray,
    description,
    availableOn: availableOnArray,
    image: req.file.path,
  });

  if (food) {
    chef.menu.push(food);
    await chef.save();
  }

  res.status(201).json({ food });
});

// @route   PUT /api/foods/:id
// @desc    Edit food item
// @access  Private
exports.updateFoodItem = asyncHandler(async (req, res) => {
  let food = await Food.findById(req.params.id);

  if (!food) {
    res.status(404);
    throw new Error("This food item does not exist");
  }

  if (food.chef.toString() !== req.user.id.toString()) {
    res.status(401);
    throw new Error("You can't access this route");
  }

  req.body.image = req.file ? req.file.path : food.image;
  req.body.tags = req.body.tags && JSON.parse(req.body.tags);
  req.body.availableOn =
    req.body.availableOn && JSON.parse(req.body.availableOn);

  food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json(food);
});

// @route   DELETE /api/foods/:id
// @desc    Delete food item
// @access  Private
exports.deleteFoodItem = asyncHandler(async (req, res) => {
  let food = await Food.findById(req.params.id);

  if (!food) {
    res.status(404);
    throw new Error("This food item does not exist");
  }

  if (food.chef.toString() !== req.user.id.toString()) {
    res.status(401);
    throw new Error("You can't access this route");
  }

  food = await Food.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted food item successfully" });
});

// @route   GET /api/foods/:id
// @desc    get single food item
// @access  Private
exports.getSingleFoodItem = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id);

  if (!food) {
    res.status(404);
    throw new Error("This food item does not exist");
  }

  if (food.chef.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You can't access this route");
  }

  res.json(food);
});

// @route   GET /api/foods/my
// @desc    get my food (chef)
// @access  Private
exports.getMyFoodItems = asyncHandler(async (req, res) => {
  const foods = await Food.find({ chef: req.user.id });
  res.json(foods);
});
