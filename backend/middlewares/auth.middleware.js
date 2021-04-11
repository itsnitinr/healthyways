const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User.model');

// Restrict routes to only logged in users using JWT
const auth = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token is sent in header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from authorization string
      token = req.headers.authorization.split(' ')[1];
      // Verify if the token matches
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get the logged in user from decoded token's id field
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Unauthorized. Token invalid.');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Unauthorized. No token.');
  }
});

// Restrict routes to only user only
const userOnly = (req, res, next) => {
  if (req.user && !req.user.isChef) {
    next();
  } else {
    res.status(401);
    throw new Error('Only users can access this route');
  }
};

// Restrict routes to only chef only
const chefOnly = (req, res, next) => {
  if (req.user && req.user.isChef) {
    next();
  } else {
    res.status(401);
    throw new Error('Only chefs can access this route');
  }
};

// Restrict routes to only admin users
const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('You need admin rights to access this!');
  }
};

module.exports = { auth, adminOnly, userOnly, chefOnly };
