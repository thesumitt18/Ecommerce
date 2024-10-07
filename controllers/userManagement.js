const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); 
const JWT_SECRET = process.env.JWT_SECRET; 

// user Sign up
exports.signup = async (req, res) => {
    const { name,email, password,role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name,email, password: hashedPassword, role });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ error: 'User creation failed' });
    }
};


// user Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id,role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

//user logout
exports.logout = (req, res) => {
    res.json({ message: 'User Logged out' });
};