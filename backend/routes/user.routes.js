const router = require('express').Router();

const {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require('../controllers/user.controllers');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/verify/:verificationToken', verifyEmail);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);

module.exports = router;
