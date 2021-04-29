const express = require('express');
const router = express.Router();

const {
  auth,
  userOnly,
  chefOnly,
  adminOnly,
} = require('../middlewares/auth.middleware');

const {
  placeOrder,
  getOrderById,
  getUserOrders,
  getChefOrders,
  getAllOrders,
  confirmOrder,
  payOrder,
  readyOrder,
} = require('../controllers/order.controllers');

router
  .route('/')
  .post(auth, userOnly, placeOrder)
  .get(auth, adminOnly, getAllOrders);

router.get('/user/my', auth, userOnly, getUserOrders);
router.get('/chef/my', auth, chefOnly, getChefOrders);

router.get('/:id', auth, getOrderById);
router.post('/:id/confirm', auth, chefOnly, confirmOrder);

router.post('/:id/pay', auth, userOnly, payOrder);
router.post('/:id/ready', auth, chefOnly, readyOrder);

router.route('/:id').get(auth, getOrderById);

module.exports = router;
