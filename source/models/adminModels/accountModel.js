const db = require('../../config/db');

const Account = {};

Account.getAll = function(callback) {
  db.query('SELECT * FROM account', callback);
};

Account.getById = function(id, callback) {
  db.query('SELECT * FROM account WHERE id=?', [id], callback);
};

Account.create = function(account, callback) {
  db.query('INSERT INTO account SET ?', account, callback);
};

Account.update = function(id, account, callback) {
  db.query('UPDATE account SET ? WHERE id=?', [account, id], callback);
};

Account.delete = function(id, callback) {
  db.query('DELETE FROM account WHERE id=?', [id], callback);
};

module.exports = Account;