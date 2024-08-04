const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', customerController.signup);
router.post('/signin', customerController.signin);
router.get('/:id', authMiddleware, customerController.getCustomer);
router.get('/', authMiddleware, customerController.getAllCustomers);
router.put('/:id', authMiddleware, customerController.updateCustomer);
router.delete('/:id', authMiddleware, customerController.deleteCustomer);

module.exports = router;
