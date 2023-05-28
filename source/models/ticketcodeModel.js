const db = require('../database/db');

const Booking = {};

Booking.findByCode = (code, callback) => {
    db.query(
        'SELECT * FROM bookings WHERE id = ?',
        [code],
        (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        }
    );
};

module.exports = Booking;