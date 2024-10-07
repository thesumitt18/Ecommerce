const express = require('express');
const cartRoutes = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const {
    addItemToCart,
    viewCart,
    updateCartItemQuantity,
    removeCartItem
} = require('../controllers/cartManagement');

// routes for shopping cart
cartRoutes.post('/create', authenticate, addItemToCart);
cartRoutes.get('/view', authenticate, viewCart);
cartRoutes.put('/update/:productId', authenticate, updateCartItemQuantity);
cartRoutes.delete('/delete/:productId', authenticate, removeCartItem);

module.exports = cartRoutes;
