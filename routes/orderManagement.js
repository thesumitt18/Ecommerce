const express = require('express');
const orderRoutes = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const {
    placeOrder,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
} = require('../controllers/orderManagement');

orderRoutes.post('/order', authenticate, placeOrder);
orderRoutes.get('/order/:id', authenticate, getOrderById);
orderRoutes.get('/orders', authenticate, getAllOrders);
orderRoutes.put('/order/:id/status', authenticate, updateOrderStatus); 

module.exports = orderRoutes;