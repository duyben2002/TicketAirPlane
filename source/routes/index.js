var express = require('express');
var router = express.Router();
var { check, validatonResult, validationResult } = require('express-validator');
const { ValidatorsImpl } = require('express-validator/src/chain');
var db = require('../database/db')
var bcrypt = require('bcrypt')
var csrf = require('csrf-token')
var fs = require('fs')
var path = require('path')
var root = path.resolve('./')

var loginValidator = [
  check('username').exists().withMessage('Chưa nhập tài khoản!').notEmpty().withMessage('Chưa nhập tài khoản!')
    .isEmail().withMessage('Email không hợp lệ!'),
  check('password').exists().withMessage('Chưa nhập mật khẩu!').notEmpty().withMessage('Chưa nhập mật khẩu!')
    .isLength({ min: 6 }).withMessage('Mật khẩu phải ít nhất 6 ký tự!')
]

var registerValidator = [
  check('name').exists().withMessage('Chưa nhập họ và tên!').notEmpty().withMessage('Chưa nhập họ và tên'),
  check('email').exists().withMessage('Chưa nhập email!').notEmpty().withMessage('Chưa nhập email')
    .isEmail().withMessage('Email không hợp lệ!'),
  check('password').exists().withMessage('Chưa nhập mật khẩu!').notEmpty().withMessage('Chưa nhập mật khẩu')
    .isLength({ min: 6 }).withMessage('Mật khẩu phải ít nhất 6 ký tự!'),
  check('confirm-password').exists().withMessage('Chưa nhập xác nhận mật khẩu').notEmpty().withMessage('Chưa nhập xác nhận mật khẩu')
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error('Mật khẩu không trùng khớp!')
      }
      return true;
    })
]


router.get('/', (req, res) => {
  var fullname = req.session.name || ''
  res.render('search', { name: fullname, message: req.flash('success') });
});

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect(303, '/search')
})

router.get('/login', (req, res) => {
  var token = csrf.createSync('LoginWebsite')
  res.render('login', { csrf: token });
});

router.post('/login', loginValidator, (req, res) => {
  var matchToken = csrf.verifySync('LoginWebsite', req.body._csrf)
  if (!matchToken)
    return res.redirect(303, '/login')
  var validate = validationResult(req)
  if (validate.errors.length === 0) {
    var { username, password } = req.body

    var sql = 'SELECT * FROM account WHERE email = ? LIMIT 1'
    var params = [username]

    db.query(sql, params, (err, result, fields) => {
      if (err) {
        req.session.flash = {
          message: err.message
        }
        return res.redirect(303, '/login')
      }
      else if (result.length === 0) {
        req.session.flash = {
          message: 'Sai tài khoản hoặc mật khẩu!'
        }
        return res.redirect(303, '/search')
      }
      else {
        var hash = result[0].password

        var match = bcrypt.compareSync(password, hash)

        if (match) {
          req.session.account = {
            email: result[0].email,
            name: result[0].name,
            isAdmin: result[0].isAdmin // Thêm thông tin vai trò của người dùng
          };
          if (req.session.account.isAdmin) {
            // Nếu là admin, truy cập vào trang quản trị
            res.render('adminViews/home', { layout:'adminViews/layout', name: req.session.name, message: `${req.session.name}` });
          } else {
            // Nếu không phải admin, truy cập vào trang tìm kiếm
            res.render('search', { name: req.session.name, message: `${req.session.name}` });
          }
        }
        else {
          req.session.flash = {
            message: 'Sai tài khoản hoặc mật khẩu!'
          }
          return res.redirect(303, '/login')
        }
      }
    })
  }
  else {
    validate = validate.mapped()
    var message
    for (i in validate) {
      message = validate[i].msg
      break
    }
    req.session.flash = {
      message: message
    }
    res.redirect(303, '/login')
  }
});

router.get('/register', (req, res) => {
  var token = csrf.createSync('RegisterWebsite')
  res.render('register', { csrf: token });
});

router.post('/register', registerValidator, (req, res) => {
  var matchToken = csrf.verifySync('RegisterWebsite', req.body._csrf)
  if (!matchToken)
    return res.redirect(303, '/register')
  var validate = validationResult(req)
  if (validate.errors.length === 0) {
    var { name, email, password } = req.body

    var hash = bcrypt.hashSync(password, 10)

    const sql = 'INSERT INTO account(name,email,password) VALUES (?,?,?)'
    const params = [name, email, hash]

    db.query(sql, params, (err, result, fields) => {
      if (err) {
        req.session.flash = {
          message: err.message
        }
        return res.redirect(303, '/register')
      }
      else if (result.affectedRows == 1) {
        var dir = path.join(root, 'public', 'users', email)
        if (!fs.existsSync(dir))
          fs.mkdirSync(dir)
        return res.redirect(303, '/login')
      }
    })
  }
  else {
    validate = validate.mapped()
    var message
    for (i in validate) {
      message = validate[i].msg
      break
    }
    req.session.flash = {
      message: message
    }
    res.redirect(303, '/register')
  }
});

module.exports = router;
