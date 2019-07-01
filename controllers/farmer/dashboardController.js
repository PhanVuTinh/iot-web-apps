var express = require('express');
var service = require('../../services/service');
var config = require('../../config/config');
var moment = require('moment'); //Thu vien ho tro dinh dang ngay
var dashboardController = express.Router();

dashboardController.get('/index', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    var arrayStation; // Chua danh sach cac tram ma nguoi dung co the xem
    //Goi API lay danh sach cac tram co the xem
    var options = service.setOption('GET', config.urladdress + '/api/station/getbyuser/' + req.user.id, { 'Authorization': token }, null);
    service.get(options, function(error, result) {
        if (error) {
            return error; //Loi khi truyen nhan du lieu
        } else {
            var result = JSON.parse(result);
            if (result.Error) {
                return new Error(); //Loi Bag Request
            } else {
                arrayStation = result.data;
                //Goi API lay tram xem mac dinh
                var options = service.setOption('GET', config.urladdress + '/api/stationdefault/getbyuser/' + req.user.id, { 'Authorization': token }, null);
                service.get(options, function(error, result) {
                    if (error) {
                        return error; //Loi khi truyen du lieu
                    } else {
                        var result = JSON.parse(result);
                        if (result.Error) {
                            return new Error(); //Loi Bag Request
                        } else {
                            if (result.data == null) {
                                //Truyen du lieu qua giao dien
                                res.render('farmer/dashboard/showDashboard', {
                                    title: 'Show Dashboard',
                                    conf: config.urladdress,
                                    token: token,
                                    userId: req.user.id,
                                    fullName: req.session.fullName,
                                    arrayStation: arrayStation,
                                    stationDefaultId: null,
                                    moment: moment,
                                    secu: config.securitycode,
                                    userid: req.user.id,
                                });
                            } else {
                                //Truyen du lieu qua giao dien
                                res.render('farmer/dashboard/showDashboard', {
                                    title: 'Show Dashboard',
                                    conf: config.urladdress,
                                    token: token,
                                    userId: req.user.id,
                                    fullName: req.session.fullName,
                                    arrayStation: arrayStation,
                                    stationDefaultId: result.data.station_id,
                                    moment: moment,
                                    secu: config.securitycode,
                                    userid: req.user.id,
                                });
                            }
                        }
                    }
                });
            }
        }
    });
});
module.exports = dashboardController;