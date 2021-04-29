const router = require('express').Router();

const {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  onboarding,
  getUserProfile,
  deleteUserProfile,
  updatePassword,
  updateProfile,
  getAllChefs,
  verifyChef,
} = require('../controllers/user.controllers');

const { auth, adminOnly } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.get('/all', auth, adminOnly, getAllChefs);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/verify/:verificationToken', verifyEmail);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.put('/update-password', auth, updatePassword);
router.post(
  '/onboarding',
  auth,
  upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'verificationDocument' },
  ]),
  onboarding
);
router.route('/').get(auth, getUserProfile).delete(auth, deleteUserProfile);
router.put('/:id/verify', auth, adminOnly, verifyChef);

module.exports = router;
