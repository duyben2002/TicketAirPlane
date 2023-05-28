const express = require('express');
const router = express.Router();
const Account = require('../../models/adminModels/accountModel');

router.get('/account', function(req, res) {
    Account.getAll(function(err, account) {
      if (err) throw err;
      res.render('adminViews/indexAccount', { layout: 'adminViews/layout', account: account });
    });
  });
router.get('/account/add', function(req, res) {
  res.render('adminViews/indexAccount', { layout: 'adminViews/layout' });
});

router.post('/account/add', function(req, res) {
  const account = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin || false,
    lock: req.body.lock || false
  };
  Account.create(account, function(err) {
    if (err) throw err;
    res.redirect('/admin/account');
  });
});

router.get('/account/edit/:id', function(req, res) {
  Account.getById(req.params.id, function(err, account) {
    if (err) throw err;
    res.render('adminViews/account', { layout: 'adminViews/layout', account:account });
  });
});

router.post('/account/edit/:id', function(req, res) {
  const account = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin || false,
    lock: req.body.lock || false
  };
  Account.update(req.params.id, account, function(err) {
    if (err) throw err;
    res.redirect('/admin/account');
  });
});

router.post('/account/:id/delete', function(req, res) {
  Account.delete(req.params.id, function(err) {
    if (err) throw err;
    res.redirect('/admin/account');
  });
});

module.exports = router;