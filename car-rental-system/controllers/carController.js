const Car = require('../models/Car');

exports.createCar = async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json({ message: 'Car deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.getCarsByModel = async (req, res) => {
    try {

        
        console.log('Request received:', req.query); 
        
        const { models } = req.query; 
        
        
        const modelsArray = models ? models.split(',') : [];

        
        const cars = await Car.find({ model: { $in: modelsArray } });

        // Send the response
        res.status(200).json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

  
  

exports.getAvailableCarsByModel = async (req, res) => {
    try {
        const { model } = req.query;
        const cars = await Car.find({ model, rentalStatus: 'available' });
        res.json(cars);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCarsByStatusOrModel = async (req, res) => {
    try {
        const { status, model } = req.query;
        const cars = await Car.find({
            $or: [{ rentalStatus: status }, { model }]
        });
        res.json(cars);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
