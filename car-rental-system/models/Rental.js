const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    rentalDate: { type: Date, default: Date.now },
    returnDate: { type: Date }
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
