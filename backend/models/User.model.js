const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email address'],
      match: [
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        'Please enter a valid email address',
      ],
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
      match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number'],
    },
    profilePic: {
      type: String,
      default: '',
    },
    emailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    verificationToken: String,
    isChef: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    chefVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    verificationDocument: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    menu: {
      monday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
        },
      ],
      tuesday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
        },
      ],
      wednesday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
        },
      ],
      thursday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
        },
      ],
      friday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
        },
      ],
      saturday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
        },
      ],
      sunday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
        },
      ],
    },
    pincode: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      formattedAddress: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving to DB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate and hash email verification token
userSchema.methods.getVerificationToken = function () {
  // Create reset token
  const verificationToken = crypto.randomBytes(20).toString('hex');

  // Hash reset token
  this.verificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  return verificationToken;
};

// Generate and hash reset password token
userSchema.methods.getResetPasswordToken = function () {
  // Create reset token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash reset token
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire time
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins

  return resetToken;
};

module.exports = User = mongoose.model('User', userSchema);
