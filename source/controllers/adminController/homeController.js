const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
    // Xử lý middleware function ở đây
    console.log('Middleware function đã được gọi');
    next();
  });
router.get('/',function(req,res){
    res.render('adminViews/home',{layout: "adminViews/layout"});
});
module.exports = router;
