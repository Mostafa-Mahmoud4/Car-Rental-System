const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, rentalController.createRental);
router.get('/:id', authMiddleware, rentalController.getRental);
router.get('/', authMiddleware, rentalController.getAllRentals);
router.put('/:id', authMiddleware, rentalController.updateRental);
router.delete('/:id', authMiddleware, rentalController.deleteRental);

module.exports = router;
