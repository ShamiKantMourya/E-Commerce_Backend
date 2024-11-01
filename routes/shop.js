const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

//Get all products
router.get('/products', shopController.getProducts);

//Get product details
router.get('/products/:productId', shopController.getProduct);

//Get cart product
router.get('/cart', shopController.getCartProducts);

//Add to cart
router.post('/cart', shopController.postCart);

// router.post('/delete-cart-product', shopController.deleteCartProduct);

// router.get('/orders', shopController.getOrders);

// router.get('/checkout', shopController.getCheckout);

module.exports = router;
