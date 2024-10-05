const { Order, Cart, Product } = require('../models'); 
const checkAdmin = (user) => {
    return user && user.role === 'admin';
};

// Place an order
exports.placeOrder = async (req, res) => {
    const userId = req.user.id; 
    try {
        const cartItems = await Cart.findAll({ where: { userId } });
        if (!cartItems.length) {
            return res.status(404).json({ error: 'Cart is empty' });
        }

        const products = [];
        let totalPrice = 0;

        for (const item of cartItems) {
            const product = await Product.findByPk(item.productId);
            if (product) {
                products.push({
                    productId: item.productId,
                    name: product.name,
                    price: product.price,
                    quantity: item.quantity,
                });
                totalPrice += product.price * item.quantity; 
            }
        }
        const order = await Order.create({ 
            userId, 
            products,
            totalPrice 
        });

        await Cart.destroy({ where: { userId } });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// View a specific order
exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const order = await Order.findOne({ where: { orderId: id, userId } });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View all orders (Admin only)
exports.getAllOrders = async (req, res) => {
    if (!checkAdmin(req.user)) {
        return res.status(403).json({ error: 'Access denied' });
    }

    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; 

    const validStatus = ['pending', 'confirmed', 'shipped'];

    if (!validStatus.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: `Order status updated to ${status}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
