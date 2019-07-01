var express = require('express');
var service = require('../../services/service'); // Ham ho tro goi API
var config = require('../../config/config.json'); //Dia chi host API
var moment = require('moment'); //Thu vien format ngay phia giao dien
var medicineController = express.Router();

medicineController.get('/danhsach', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    res.render('farmer/medicine/listMedicine', {
        title: 'Quản lý thuốc',
        conf: config.urladdress,
        token: token,
        userId: req.user.id,
        fullName: req.session.fullName,
        moment: moment,
        secu: config.securitycode,
        userid: req.user.id,
    });
});

module.exports = medicineController;