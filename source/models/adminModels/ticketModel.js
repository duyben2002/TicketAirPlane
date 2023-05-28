const db = require('../../config/db');

const Ticket = {};

Ticket.getAll = (callback) => {
  db.query('SELECT * FROM ticket', (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

Ticket.getById = (id, callback) => {
  db.query('SELECT * FROM ticket WHERE id = ?', [id], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results[0]);
  });
};

Ticket.add = (data, callback) => {
  db.query('INSERT INTO ticket SET ?', data, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result.insertId);
  });
};

Ticket.update = (id, data, callback) => {
  db.query('UPDATE ticket SET ? WHERE id = ?', [data, id], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result.affectedRows);
  });
};

Ticket.remove = (id, callback) => {
  db.query('DELETE FROM ticket WHERE id = ?', [id], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result.affectedRows);
  });
};

module.exports = Account;