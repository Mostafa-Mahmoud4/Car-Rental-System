
const express = require('express');
const connectDB = require('./config/db');
const carRoutes = require('./routes/cars');
const customerRoutes = require('./routes/customers');
const rentalRoutes = require('./routes/rentals');


const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/cars', carRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/rentals', rentalRoutes);




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
