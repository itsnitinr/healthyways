const crypto = require('crypto');
const axios = require('axios');
const asyncHandler = require('express-async-handler');
const generateJWT = require('../utils/generateJWT.utils');
const sendEmail = require('../utils/sendEmail.utils');
const User = require('../models/User.model');

// @route   POST /api/users/register
// @desc    Registers an user
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isChef } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists. Please log in.');
  } else {
    const user = await User.create({
      name,
      email,
      password,
      isChef,
    });
    if (user) {
      const verificationToken = user.getVerificationToken();
      await user.save({ validateBeforeSave: false });

      const verificationUrl = `${req.protocol}://${req.get(
        'host'
      )}/verify/${verificationToken}`;

      const text = `To verify your account, please click here: \n\n ${verificationUrl}`;

      try {
        sendEmail({
          toEmail: user.email,
          subject: 'Account Verification',
          text,
        });
      } catch (err) {
        user.verificationToken = undefined;
        await user.save({ validateBeforeSave: false });
        res.status(500);
        throw new Error('Email could not be sent');
      }

      res.status(201).json({ user, token: generateJWT(user._id) });
    }
  }
});

// @route   POST /api/users/login
// @desc    Logs in an user
// @access  Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    if (!user.emailVerified) {
      res.status(401);
      throw new Error('Please verify your account before logging in');
    }
    res.json({ user, token: generateJWT(user._id) });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @route   PUT /api/users/verify/:verificationToken
// @desc    Verify email address
// @access  Public
exports.verifyEmail = asyncHandler(async (req, res) => {
  const verificationToken = crypto
    .createHash('sha256')
    .update(req.params.verificationToken)
    .digest('hex');

  const user = await User.findOne({ verificationToken });

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired token.');
  }

  user.emailVerified = true;
  await user.save();

  res.json({
    message: 'Your email has been successfully verified. Please log in.',
  });
});

// @route   PUT /api/users/forgot-password
// @desc    Send password reset email with token
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/reset-password/${resetToken}`;

  try {
    sendEmail({
      toEmail: user.email,
      subject: 'HealthyWays - Password reset',
      text: `Your password reset link: ${resetUrl}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500);
    throw new Error('Email could not be sent');
  }

  res.json({ message: 'Email sent' });
});

// @route   PUT /api/users/reset-password/:resetToken
// @desc    Resets password
// @access  Public
exports.resetPassword = asyncHandler(async (req, res) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired token.');
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.json({ user, token: generateJWT(user._id) });
});

// @route   POST /api/users/onboarding
// @desc    Create or update profile of user
// @access  Requires login
exports.onboarding = asyncHandler(async (req, res) => {
  const { pincode, phoneNumber } = req.body;
  const { profilePic, verificationDocument } = req.files;

  let user = await User.findById(req.user.id);

  // Get location via pincode
  const { data } = await axios.get(`https://geocode.xyz/${pincode}?json=1`);
  user.location.type = 'Point';
  user.location.coordinates = [data.longt, data.latt];
  user.location.formattedAddress = data.standard.addresst;

  user.pincode = pincode;
  user.phoneNumber = phoneNumber;

  // Set profile pic
  if (profilePic) {
    user.profilePic = profilePic[0].path;
  }

  // Set documents if chef
  if (user.isChef && verificationDocument) {
    if (!verificationDocument && !user.verificationDocument) {
      throw new Error('Please attach your verification document');
    }
    user.verificationDocument = verificationDocument[0].path;
  }

  user = await user.save();
  res.json({ user, token: generateJWT(user._id) });
});

exports.updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error('Please recheck your inputs');
  }

  if (await user.matchPassword(currentPassword)) {
    user.password = newPassword;
  } else {
    res.status(401);
    throw new Error('You have entered the wrong current password');
  }

  await user.save();

  res.json({ user, token: generateJWT(user._id) });
});

exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ user, token: generateJWT(user._id) });
});

exports.deleteUserProfile = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.json({ message: 'Account deleted' });
});
