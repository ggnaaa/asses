const express = require('express');
const router = express.Router();
const carController = require('../controllers/carcontroller');

router.get('/get-cars', async(req, res) => {
    console.log('Routeeeeeeeeeeeeeeeeeeeeee');
    await carController.getCars(req, res)
});

module.exports = router;