const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, carController.createCar);
router.get('/:id', carController.getCar);
router.get('/', carController.getAllCars);
router.put('/:id', authMiddleware, carController.updateCar);
router.delete('/:id', authMiddleware, carController.deleteCar);

// Special APIs
router.get('/model/query', carController.getCarsByModel);
router.get('/model/available/query', carController.getAvailableCarsByModel);
router.get('/statusOrModel/query', carController.getCarsByStatusOrModel);

module.exports = router;
