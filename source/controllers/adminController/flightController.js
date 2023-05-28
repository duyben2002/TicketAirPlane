

const Flight = require('../../models/adminModels/flightModel');
const express = require('express');
const router = express.Router();


router.get('/flight', (req, res) => {
    Flight.getAll((err, flights) => {
        if (err) throw err;
        res.render('adminViews/indexFlight', { layout: 'adminViews/layout', flight: flights });
    });
});

router.post('/flight/add', (req, res) => {
    const { airline, departure_location, arrival_location, departure_date, arrival_date, departure_time, arrival_time, economy_price, business_price } = req.body;
    const flight = {
        airline,
        departure_location,
        arrival_location,
        departure_date,
        arrival_date,
        departure_time,
        arrival_time,
        economy_price,
        business_price
    };
    flight.business_price= parseFloat(business_price);
    flight.economy_price =parseFloat(economy_price);

    Flight.create(flight, (err) => {
        if (err) throw err;
        res.redirect('/admin/flight');
    });
});



router.post('/flight/update/:id', (req, res) => {
    const id = req.params.id;
    const flight = req.body;
    Flight.update(id, flight, (err) => {
        if (err) throw err;
        res.redirect('/admin/flight');
    });
});

router.post('/flight/:id/delete', (req, res) => {
    const id = req.params.id;
    Flight.delete(id, (err) => {
        if (err) throw err;
        res.redirect('/admin/flight');
    });
});

module.exports = router;

