var db = require('../database/db');
const bookingModel = {};

bookingModel.create = (booking, callback) => {
    db.query('INSERT INTO bookings SET ?', booking, (err, result) => {
        if (err) throw err;
        callback(result);
    });
};

module.exports = bookingModel;
