const db = require('../../config/db');

const Booking = {};

Booking.getAll = (callback) => {
  db.query('SELECT * FROM bookings', callback);
};

Booking.getById = (id, callback) => {
  db.query('SELECT * FROM bookings WHERE id = ?', [id], callback);
};

Booking.create = (booking, callback) => {
  db.query('INSERT INTO bookings SET ?', booking, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result.insertId);
  });
};  

Booking.update = (id, booking, callback) => {
  db.query('UPDATE bookings SET adults = ?, children = ?, infants = ?, total = ? WHERE id = ?', [booking.adults, booking.children, booking.infants, booking.total, id], callback);
};

Booking.delete = (id, callback) => {
  db.query('DELETE FROM bookings WHERE id = ?', [id], callback);
};

module.exports = Booking;