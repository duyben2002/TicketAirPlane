const express = require('express');
const router = express.Router();
const flightModel = require('../models/flightsModel');

// Xử lý yêu cầu GET từ phía người dùng để hiển thị trang tìm kiếm
router.get('/', (req, res) => {
    res.render('search');
});

// Xử lý yêu cầu POST từ phía người dùng để hiển thị thông tin chuyến bay
router.post('/search', (req, res) => {
    let departureLocation = req.body.departureLocation;
    let arrivalLocation = req.body.arrivalLocation;
    let departureDate = req.body.departureDate;
    let arrivalDate = req.body.arrivalDate;
    
    // Kiểm tra xem người dùng đã chọn Một chiều hay Khứ hồi
    let oneway = req.body.oneway;

    if (oneway) {
        flightModel.getFlights(departureLocation, arrivalLocation, departureDate, null, (results) => {
            res.render('results', { results,departureLocation: departureLocation,arrivalLocation:arrivalLocation,departureDate:departureDate})
            
        });
    } else {
        flightModel.getFlights(departureLocation, arrivalLocation, departureDate, arrivalDate, (results) => {
            res.render('results', { results,departureLocation: departureLocation,arrivalLocation:arrivalLocation,departureDate:departureDate,arrivalDate:arrivalDate});
        });
    }
    
});
module.exports = router;
