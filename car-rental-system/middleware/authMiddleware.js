const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'jwtSecret');
        req.customer = await Customer.findById(decoded.id);
        if (!req.customer) {
            throw new Error();
        }
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};
