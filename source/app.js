const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');
var hbs = require('hbs');

var indexRouter = require('./routes/index');
var path = require('path');
const authMiddleware = require('./middleware/auth')
const hbsLayouts = require('handlebars-layouts');
const adminHomeController = require('./controllers/adminController/homeController')
const adminCccountController = require('./controllers/adminController/accountController')
const adminBookingController = require('./controllers/adminController/bookingController')
const adminFlightController = require('./controllers/adminController/flightController')
const flightController = require('./controllers/flightsController');
const bookingRoutes = require('./routes/bookingRoutes');
const confirmationRoutes = require('./routes/confirmationRoute');
const aboutRouter = require('./routes/about');
const servicesRouter = require('./routes/services');
const contactRouter = require('./routes/contactRouter');
const homeRouter = require('./routes/homeRouter');
var db = require('./database/db');
const ticketcodeController = require('./controllers/ticketcodeController');
// Thiết lập Handlebars làm view engine
app.set('view engine', 'hbs');
app.use(express.static('public'));
// Sử dụng body-parser để xử lý dữ liệu form
app.use(bodyParser.urlencoded({ extended: true }));
hbs.registerHelper('dateFormat', (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const hours = ('0' + d.getHours()).slice(-2);
    const minutes = ('0' + d.getMinutes()).slice(-2);
    const seconds = ('0' + d.getSeconds()).slice(-2);
    return `${day}/${month}/${year} `;
  });
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());


app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Sử dụng controller để xử lý yêu cầu từ phía người dùng
app.use('/', flightController);
// Khi truy cập trang chủ, redirect sang đường dẫn /flights
app.get('/', (req, res) => {
    res.redirect('/search');
});

app.use('/', indexRouter);
app.use('/search', homeRouter);
app.use('/services', servicesRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/bookings',  bookingRoutes);
app.use('/confirmation', confirmationRoutes);

app.use('/admin',(req, res, next) => {
    // Kiểm tra xem người dùng có quyền admin hay không
    if (req.session.account && req.session.account.isAdmin) {
      // Nếu có quyền admin, cho phép truy cập vào trang quản trị
      next();
    } else {
      // Nếu không có quyền admin, redirect tới trang đăng nhập
      res.redirect('/login');
    }
  }, adminHomeController ,adminCccountController,adminBookingController,adminFlightController);

// cấu hình router
app.get('/ticket_code', ticketcodeController.getIndex);
app.post('/ticket_code', ticketcodeController.postIndex);
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.get('/favicon.ico', (req, res) => res.status(204));

// Khởi động server
app.listen(3000, () => console.log('Server started at port 2002'));
