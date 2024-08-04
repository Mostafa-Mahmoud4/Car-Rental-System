const Rental = require('../models/Rental');
const Car = require('../models/Car');

exports.createRental = async (req, res) => {
    try {
        const rental = new Rental(req.body);
        await rental.save();

        // Update car rental status to rented
        await Car.findByIdAndUpdate(rental.car, { rentalStatus: 'rented' });

        res.status(201).json(rental);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateRental = async (req, res) => {
    try {
        const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!rental) {
            return res.status(404).json({ error: 'Rental not found' });
        }

        // Update car rental status based on return date
        if (rental.returnDate) {
            await Car.findByIdAndUpdate(rental.car, { rentalStatus: 'available' });
        }

        res.json(rental);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteRental = async (req, res) => {
    try {
        const rental = await Rental.findByIdAndDelete(req.params.id);
        if (!rental) {
            return res.status(404).json({ error: 'Rental not found' });
        }

        // Update car rental status to available
        await Car.findByIdAndUpdate(rental.car, { rentalStatus: 'available' });

        res.json({ message: 'Rental deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllRentals = async (req, res) => {
    try {
        const rentals = await Rental.find().populate('car customer');
        res.json(rentals);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRental = async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id).populate('car customer');
        if (!rental) {
            return res.status(404).json({ error: 'Rental not found' });
        }
        res.json(rental);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
