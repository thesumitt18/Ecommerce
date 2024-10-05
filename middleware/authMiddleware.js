const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; 

exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ error: 'no token' }); 
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ error: 'not verified' }); 
        }
        req.user = user; 
        console.log('Authenticated User:', req.user);
        next();
    });
};