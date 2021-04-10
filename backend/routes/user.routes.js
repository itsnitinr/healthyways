const router = require('express').Router();

const {
  registerUser,
  loginUser,
  verifyEmail,
} = require('../controllers/user.controllers');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/verify/:verificationToken', verifyEmail);

module.exports = router;
