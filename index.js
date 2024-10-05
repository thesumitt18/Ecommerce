const express = require('express');
const cors = require('cors');
const db=require('./dbconfig/dbconfig')
const userRoute = require('./routes/userManagement');
const productRoutes = require('./routes/productManagement');
const cartRoutes = require('./routes/shoppingCart');
const orderRoutes = require('./routes/orderManagement');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors()); 
app.use(express.json()); 

app.use('/auth', userRoute);
app.use('/api', productRoutes);
app.use('/cart', cartRoutes);
app.use('/api', orderRoutes);


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});