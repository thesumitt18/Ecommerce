
const express = require('express');
const productRoutes = express.Router();
const {addProduct,updateProduct,deleteProduct,getAllProducts,getProductById} = require('../controllers/productManagement');
const { authenticate } = require('../middleware/authMiddleware');

productRoutes.post('/products', authenticate, addProduct);
productRoutes.put('/products/:id', authenticate, updateProduct);
productRoutes.delete('/products/:id', authenticate, deleteProduct);
productRoutes.get('/getallproducts',authenticate, getAllProducts);
productRoutes.get('/products/:id',authenticate, getProductById);

module.exports = productRoutes;
