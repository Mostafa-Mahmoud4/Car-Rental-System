const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    rentalStatus: { type: String, enum: ['available', 'rented'], default: 'available' },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
