const express = require('express');
const router = express.Router();
const addOrderItems = require('../controllers/orderController');
const getOrderById = require('../controllers/orderController');
const updateOrderToPaid = require('../controllers/orderController');
const getMyOrders = require('../controllers/orderController');
const getOrders = require('../controllers/orderController');
const updateOrderToDelivered = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;
