const express = require('express');
const router = express.Router();
const getProducts = require('../controllers/productController');
const getProductById = require('../controllers/productController');
const deleteProduct = require('../controllers/productController');
const createProduct = require('../controllers/productController');
const updateProduct = require('../controllers/productController');
const createProductReview = require('../controllers/productController');
const getTopProducts = require('../controllers/productController');

const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.get('/top', getTopProducts);
router
	.route('/:id')
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct);

module.exports = router;
