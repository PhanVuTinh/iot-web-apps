var express = require('express'); //Goi thu vien Express
var service = require('../../services/service'); // Ham ho tro goi API
var config = require('../../config/config.json'); //Dia chi host API
var moment = require('moment'); //Thu vien format ngay phia giao dien

var userController = express.Router();

userController.get('/capnhatmatkhau/:id', service.ensureAuthenticated, function(req, res) {
    if (req.params.id == req.session.userid) {
        var token = "JWT " + req.session.token;
        res.render("farmer/user/changePassword", {
            title: 'Cập nhật mật khẩu',
            conf: config.urladdress,
            token: token,
            userId: req.user.id,
            fullName: req.session.fullName,
            moment: moment,
            secu: config.securitycode,
            userid: req.user.id,
        });
    } else {
        res.redirect('/quantrac/nongdan');
    }
});




module.exports = userController;