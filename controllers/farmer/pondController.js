var express = require('express');
var pondController = express.Router();
var request = require("request");
var service = require('../../service');
var config = require('../../config/config.json');


// pondController.get('/danhsachaonuoi',service.ensureAuthenticated,function(req,res){
// 	res.render("farmer/pond/danhsachao",{title:"Danh sách ao nuôi",secu:config.securitycode,conf:config.urladdress,token:req.session.token,userid:req.session.userid,username:req.session.username,fullName:req.session.fullName});
// });
//Tao moi ao nuoi
// pondController.get('/taoaonuoi', function(req, res) {
// 	console.log(req.session);
//   res.render("farmer/testView");
// });

pondController.get('/danhsachaonuoi', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    res.render('farmer/pond/danhsachao', {
        title: 'Danh sách ao nuôi',
        conf: config.urladdress,
        token: token,
        userId: req.user.id,
        fullName: req.session.fullName,
        secu: config.securitycode,
        userid: req.user.id,
    });
});
pondController.get('/themaonuoi', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    res.render('farmer/pond/themao', {
        title: 'Thêm ao nuôi',
        conf: config.urladdress,
        token: token,
        userId: req.user.id,
        fullName: req.session.fullName,
        secu: config.securitycode,
        userid: req.user.id,
    });
});
pondController.post('/themaonuoi', service.ensureAuthenticated, function(req, res) {
    var region_id = req.body.region_id;
    var user_id = req.user.id;
    var pond_width = req.body.pond_width;
    var pond_height = req.body.pond_height;
    var pond_depth = req.body.pond_depth;
    var pond_description = req.body.pond_description;
    var pond_address = req.body.pond_address;
    var pond_latitude = req.body.pond_latitude;
    var pond_longitude = req.body.pond_longitude;
    var pond_location = service.latLngToDMS(pond_latitude) + ((pond_latitude > 0) ? 'N' : 'S') + ' ,' + service.latLngToDMS(pond_longitude) + ((pond_longitude > 0) ? 'E' : 'W');
    var token = "JWT " + req.session.token;
    var options = {
        url: config.urladdress + '/api/pond/create/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        form: {
            region_id: region_id,
            user_id: user_id,
            pond_width: pond_width,
            pond_height: pond_height,
            pond_depth: pond_depth,
            pond_description: pond_description,
            pond_location: pond_location,
            pond_address: pond_address,
            pond_latitude: pond_latitude,
            pond_longitude: pond_longitude,
        }
    };
    service.post(options, function(error, data) {
        if (error) {
            return error;
        }
        res.redirect('/quantrac/nongdan/aonuoi/danhsachaonuoi');
    });
});
pondController.get('/capnhataonuoi/:id', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token;
    var id = req.params.id;
    var address = config.urladdress + '/api/pond/getbyid/' + id;
    var options = {
        url: address,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
    };
    service.get(options, function(error, data) {
        if (error) {
            return error;
        } else {
            dt = JSON.parse(data);
            ponddata = dt.data;
            res.render("farmer/pond/capnhatao", {
                title: "Cập nhật thông tin ao nuôi",
                ponddata: ponddata,
                conf: config.urladdress,
                token: token,
                userId: req.user.id,
                username: req.session.username,
                fullName: req.session.fullName,
                userid: req.user.id,
            });
        }
    });
});
pondController.post('/capnhataonuoi', service.ensureAuthenticated, function(req, res) {
    var pond_id = req.body.pond_id;
    var region_id = req.body.region_id;
    var user_id = req.user.id;
    var pond_width = req.body.pond_width;
    var pond_height = req.body.pond_height;
    var pond_depth = req.body.pond_depth;
    var pond_description = req.body.pond_description;
    var pond_status = req.body.pond_status;
    var pond_address = req.body.pond_address;
    var pond_latitude = req.body.pond_latitude;
    var pond_longitude = req.body.pond_longitude;
    var pond_location = service.latLngToDMS(pond_latitude) + ((pond_latitude > 0) ? 'N' : 'S') + ' ,' + service.latLngToDMS(pond_longitude) + ((pond_longitude > 0) ? 'E' : 'W');
    var token = "JWT " + req.session.token;
    var address = config.urladdress + '/api/pond/update/' + pond_id;
    var options = {
        method: 'PUT', //muon cap nhat du lieu phai them method la put
        url: address,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        form: {
            region_id: region_id,
            user_id: user_id,
            pond_width: pond_width,
            pond_height: pond_height,
            pond_depth: pond_depth,
            pond_width: pond_width,
            pond_description: pond_description,
            pond_location: pond_location,
            pond_status: pond_status,
            pond_address: pond_address,
            pond_latitude: pond_latitude,
            pond_longitude: pond_longitude,
            userid: req.user.id,
        }
    };
    service.put(options, function(error, data) {
        if (error) {
            return error;
        } else {
            res.redirect('/quantrac/nongdan/aonuoi/danhsachaonuoi');
        }
    });
});
module.exports = pondController;