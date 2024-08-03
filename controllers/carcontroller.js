const { response } = require('express');
const Car = require('../models/car');
// const car = require('../models/car');
// const { MongoClient } = require("mongodb");
// const uri = 'mongodb+srv://gaganashetty07:hQR1wi2AY4Jm5kUW@cluster0.pdrn5dg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// const client = new MongoClient(uri);
// await client.connect();
// const dbName = "cars";
// const collectionName = "Car";
// const database = client.db(dbName);
// const collection = database.collection(collectionName);

exports.createCar = async(req, res) => {
    const { carName, manufacturingYear, price } = req.body;
    try {
        const newCar = new Car({ carName, manufacturingYear, price });
        await newCar.save();
        res.json({ message: 'Car created', car: newCar });
    } catch (error) {
        res.status(500).json({ message: 'Error creating car', error });
    }
};

exports.getCars = async(req, res) => {
    try {
        console.log(Car.find({}));
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cars', error });
    }

};

exports.updateCar = async(req, res) => {
    const { id } = req.params;
    const { carName, manufacturingYear, price } = req.body;
    try {
        const updatedCar = await Car.findByIdAndUpdate(id, { carName, manufacturingYear, price }, { new: true });
        res.json({ message: 'Car updated', car: updatedCar });
    } catch (error) {
        res.status(500).json({ message: 'Error updating car', error });
    }
};

exports.deleteCar = async(req, res) => {
    const { id } = req.params;
    try {
        await Car.findByIdAndDelete(id);
        res.json({ message: 'Car deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting car', error });
    }
};

exports.getDashboard = async(req, res) => {
    try {
        const totalCars = await Car.countDocuments();
        res.json({ totalCars });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard data', error });
    }
};