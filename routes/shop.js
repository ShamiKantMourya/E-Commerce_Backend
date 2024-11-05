const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

//Get all products
router.get('/products', shopController.getProducts);

//Get product details
router.get('/products/:productId', shopController.getProduct);

// //Get cart product
// router.get('/cart', shopController.getCartProducts);

// //Add to cart
// router.post('/cart', shopController.postCart);

// //Delete cart product
// router.post('/delete-cart-product', shopController.deleteCartProduct);

// //Create order
// router.post('/create-order', shopController.postOrders);

// //Get Order
// router.get('/orders', shopController.getOrder);

// router.get('/checkout', shopController.getCheckout);

module.exports = router;
