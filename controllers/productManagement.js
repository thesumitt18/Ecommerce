const {Product} = require('../models');

const checkAdmin = (user) => {
    return user && user.role === 'admin';
};

// Add a new product (Admin only)
exports.addProduct = async (req, res) => {
    if (!checkAdmin(req.user)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    try {
        const { name, price, description, quantity, imageUrl, category } = req.body;
        const product = await Product.create({ name, price, description, quantity, category, imageUrl});
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing product (Admin only)
exports.updateProduct = async (req, res) => {
    if (!checkAdmin(req.user)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    try {
        const { id } = req.params;
        const { name, price, description, quantity, imageUrl, category } = req.body;
        const product = await Product.update(
            { name, price, description, quantity, imageUrl, category },
            { where: { id } }
        );
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const updatedProduct = await Product.findByPk(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product (Admin only)
exports.deleteProduct = async (req, res) => {
    if (!checkAdmin(req.user)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    try {
        const { id } = req.params;
        await Product.destroy({ where: { id } });
        res.status(200).json({ message: `Product ${id} deleted` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all products (for all)
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single product by ID (for all)
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};