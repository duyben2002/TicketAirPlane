const express = require('express');
const router = express.Router();
const Booking = require('../../models/adminModels/bookingModel');
router.get('/booking', (req, res) => {
  Booking.getAll((err, booking) => {
    if (err) throw err;
    res.render('adminViews/indexBooking', { layout: "adminViews/layout", booking: booking });
  });
});


router.post('/booking/add', (req, res) => {
  const booking = {
    adults:req.body.adults,
    children: req.body.children,
    infants: req.body.infants,
    total:req.body.total
  };
 
  Booking.create(booking, (err) => {
    if (err) throw err;

    res.redirect('/admin/booking');
  });
});


router.post('/booking/update/:id', (req, res) => {
  const booking =req.body;
  

  Booking.update(req.params.id, booking, (err) => {
    if (err) throw err;

    res.redirect('/admin/booking');
  });
});

router.post('/booking/:id/delete', (req, res) => {
  Booking.delete(req.params.id, (err) => {
    if (err) throw err;

    res.redirect('/admin/booking');
  });
});

module.exports = router;