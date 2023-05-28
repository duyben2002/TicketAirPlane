const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flightsController');

router.get('/', (req, res) => {
    res.render('searchFlight');
});

router.post('/search', flightsController.search);

module.exports = router;

