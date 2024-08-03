const express = require('express');
const Car = require('./Car');

const app = express();

app.get('/cars', async(req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching cars' });
    }
});

// ... other API routes for creating, updating, deleting cars

app.listen(3000, () => console.log('Server listening on port 3000'));