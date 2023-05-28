const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');

router.get('/', (req, res) => {
    res.render('booking');
});

router.post('/', (req, res) => {
    // Lưu thông tin vào session
    const { adults, children, infants, total } = req.body;
    req.session.adults = adults;
    req.session.children = children;
    req.session.infants = infants;
    req.session.total = total;

    // Gọi hàm xử lý tạo booking từ controller
    bookingController.create(req, res);
});

module.exports = router;
