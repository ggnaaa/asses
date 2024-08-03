// routes/admin.js
const express = require('express');
const router = express.Router();
const carController = require('../controllers/carcontroller');
// const authenticateToken = require('../middlewares/authmiddleware');

router.post('/create-car', carController.createCar);
router.get('/get-cars', carController.getCars);
router.put('/update-car/:id', carController.updateCar);
router.delete('/delete-car/:id', carController.deleteCar);
router.get('/dashboard', carController.getDashboard);

module.exports = router;