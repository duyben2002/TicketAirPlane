const bookingModel = require('../models/bookingModel');

const bookingController = {};

bookingController.create = (req, res) => {
    const booking = {
        adults: req.body.adults,
        children: req.body.children,
        infants: req.body.infants,
    };

    bookingModel.create(booking, (result) => {
        console.log('Booking created:', result);
        res.redirect('/confirmation');
    });
};


module.exports = bookingController;
