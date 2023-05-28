const db = require('../../config/db');

const Flight = {};

Flight.getAll = (callback) => {
  db.query('SELECT * FROM flights', callback);
};

Flight.getById = (id, callback) => {
  db.query('SELECT * FROM flights WHERE flight_id = ?', [id], callback);
};

Flight.create = (flight, callback) => {
    db.query('INSERT INTO flights SET ?', flight, callback);
  };

Flight.update = (id, flight, callback) => {
  db.query('UPDATE flights SET ? WHERE flight_id = ?', [flight, id], callback);
};

Flight.delete = (id, callback) => {
  db.query('DELETE FROM flights WHERE flight_id = ?', [id], callback);
};

module.exports = Flight;