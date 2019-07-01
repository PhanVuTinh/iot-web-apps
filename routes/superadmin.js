var express = require('express');
var superadminRouter = express.Router();
var service = require('../services/service');
var config = require('../config/config.json');
var userController = require('../controllers/superadmin/userController');
var regionController = require('../controllers/superadmin/regionController');
superadminRouter.get('/', function(req, res) {
    res.render('superadminLayout', {
        title: 'Trang chủ',
        secu: config.securitycode,
        conf: config.urladdress,
        token: req.session.token,
        userid: req.session.userid,
        username: req.session.username,
        fullName: req.session.fullName
    });
});

superadminRouter.use('/nguoidung', userController);
superadminRouter.use('/vung', regionController);
module.exports = superadminRouter;