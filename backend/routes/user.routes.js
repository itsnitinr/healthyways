const router = require('express').Router();

const {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  onboarding,
} = require('../controllers/user.controllers');

const { auth } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/verify/:verificationToken', verifyEmail);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.post(
  '/onboarding',
  auth,
  upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'verificationDocument' },
  ]),
  onboarding
);

module.exports = router;
