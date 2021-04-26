const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const razorpay = require('../config/razorpay.config');
const sendEmail = require('../utils/sendEmail.utils');
const Order = require('../models/Order.model');

// @route   POST /api/orders
// @desc    Place an order
// @access  Private
exports.placeOrder = asyncHandler(async (req, res) => {
  const { chef, foodItems, orderPrice, taxPrice, totalPrice } = req.body;

  if (!foodItems.length) {
    res.status(400);
    throw new Error('Nothing to order');
  } else {
    const order = new Order({
      user: req.user.id,
      chef,
      foodItems,
      orderPrice,
      taxPrice,
      totalPrice,
    });
    let createdOrder = await order.save();

    // Razorpay stuff
    const razorpayOptions = {
      amount: Math.round(totalPrice * 100),
      currency: 'INR',
      receipt: `Order: ${createdOrder._id}`,
      payment_capture: 1,
    };

    try {
      const response = await razorpay.orders.create(razorpayOptions);
      createdOrder.razorpayOrderId = response.id;
      createdOrder = await createdOrder.save();

      const populatedOrder = await Order.populate(createdOrder, [
        {
          path: 'user',
          select: 'name email',
        },
        {
          path: 'user',
          select: 'name email',
        },
      ]);

      sendEmail({
        to: populatedOrder.user.email,
        subject: `Your order ${populatedOrder._id} has been placed`,
        text: `Your order has been placed`,
      });

      sendEmail({
        to: populatedOrder.chef.email,
        subject: 'New order received',
        text: `You have received a new order ${populatedOrder._id}. Please check your dashboard.`,
      });
    } catch (err) {
      console.log(err);
    }
    res.status(201).json(populatedOrder);
  }
});

// @route   GET /api/orders/:id
// @desc    Get order details by ID
// @access  Private
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate([
    {
      path: 'user',
      select: 'name email',
    },
    {
      path: 'chef',
      select: 'name email',
    },
  ]);

  // Check if order exists
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @route   GET /api/orders/user/my
// @desc    Get logged in user's orders
// @access  Private
exports.getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate([
      { path: 'chef', select: 'name' },
      { path: 'foodItems.food', select: 'foodName' },
    ])
    .sort('-createdAt');
  res.json(orders);
});

// @route   GET /api/orders/chef/my
// @desc    Get logged in chef's orders
// @access  Private
exports.getChefOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ chef: req.user._id })
    .populate([
      { path: 'chef', select: 'name' },
      { path: 'foodItems.food', select: 'foodName' },
    ])
    .sort('-createdAt');
  res.json(orders);
});

// @route   GET /api/orders/
// @desc    Get all orders
// @access  Admin
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate([
      {
        path: 'user',
        select: 'name email',
      },
      {
        path: 'chef',
        select: 'name email',
      },
    ])
    .sort('-createdAt');
  res.json(orders);
});

// @route   GET /api/orders/:id
// @desc    Get order details by ID
// @access  Private
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate([
    {
      path: 'user',
      select: 'name email phoneNumber',
    },
    {
      path: 'chef',
      select: 'name phoneNumber',
    },
    {
      path: 'foodItems.food',
      select: 'foodName image',
    },
  ]);

  // Check if order exists
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @route   POST /api/orders/:id/confirm
// @desc    Approve or reject order
// @access  Chef only
exports.confirmOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (order.chef.toString() !== req.user.id) {
    res.status(401);
    throw new Error('You are not authorized to confirm this order.');
  }

  const { isConfirmed } = req.body;
  order.underConfirmation = false;
  order.isConfirmed = isConfirmed;

  let updatedOrder = await order.save();
  updatedOrder = await Order.populate(updatedOrder, [
    {
      path: 'user',
      select: 'name email phoneNumber',
    },
    {
      path: 'chef',
      select: 'name phoneNumber',
    },
    {
      path: 'foodItems.food',
      select: 'foodName image',
    },
  ]);

  try {
    sendEmail({
      to: updatedOrder.user.email,
      subject: isConfirmed
        ? 'HealthyWays Meals - Order approved'
        : 'HealthyWays Meals - Order failed',
      text: isConfirmed
        ? 'Your order has been confirmed by the chef. Please pay for your order.'
        : 'We regret to inform that your order has been rejected by the chef due to unforeseen circumstances',
    });
  } catch (error) {
    console.log(error);
  }

  res.json(updatedOrder);
});

// @route   POST /api/orders/:id/pay
// @desc    Set order to paid
// @access  User only
exports.payOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  const { razorpay_payment_id, razorpay_signature } = req.body;

  // Validate payment
  const razorpayOrderId = order.razorpayOrderId;
  const paymentId = razorpay_payment_id;
  const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  shasum.update(`${razorpayOrderId}|${paymentId}`);
  const digest = shasum.digest('hex');

  if (digest === razorpay_signature) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.razorpayPaymentId = paymentId;
    order.razorpaySignature = razorpay_signature;
    const updatedOrder = await order.save();
    const populatedOrder = await Order.populate(updatedOrder, [
      {
        path: 'user',
        select: 'name email',
      },
      {
        path: 'chef',
        select: 'name phoneNumber',
      },
    ]);

    try {
      sendEmail({
        to: populatedOrder.chef.email,
        subject: `Payment received for order ${updatedOrder._id}`,
        text: `You have received Rs.${populatedOrder.totalPrice} for your order.`,
      });

      sendEmail({
        to: populatedOrder.user.email,
        subject: `PCB Cupid - Payment successful for order ${updatedOrder._id}`,
        text: `You have paid Rs.${populatedOrder.totalPrice} for your order.`,
      });
    } catch (error) {
      console.log(error);
    }

    res.json(updatedOrder);
  } else {
    res.status(401);
    throw new Error('Invalid signature.');
  }
});

// @route   POST /api/orders/:id/ready
// @desc    Mark order as ready
// @access  Chef only
exports.readyOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (order.chef.toString() !== req.user.id) {
    res.status(401);
    throw new Error('You are not authorized to mark this order as ready.');
  }

  // Update order status
  order.isReady = true;
  order.readyAt = Date.now();

  const updatedOrder = await order.save();
  const populatedOrder = await Order.populate(updatedOrder, [
    {
      path: 'user',
      select: 'name email',
    },
    {
      path: 'chef',
      select: 'name phoneNumber',
    },
  ]);

  // Send email to user
  try {
    sendEmail({
      to: populatedOrder.user.email,
      subject: 'HealthyWays - Your order is ready',
      text: 'Your order is ready! Please pick it up.',
    });
  } catch (error) {
    console.log(error);
  }

  res.json(updatedOrder);
});
