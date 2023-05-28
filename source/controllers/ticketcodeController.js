const Booking = require('../models/ticketcodeModel');

const bookingController = {};
bookingController.getIndex = (req, res) => {
    res.render('ticket_code');
};

bookingController.postIndex = (req, res) => {
    const code = req.body.code;
    Booking.findByCode(code, (err, result_ticketcode) => {
        if (err) {
            return res.render('ticket_code', { error: 'Error occurred' });
        }
        if (!result_ticketcode) {
            return res.render('ticket_code', { error: 'Booking not found' });
        }
        res.render('result_ticketcode', { result_ticketcode });
    });
};

module.exports = bookingController;
