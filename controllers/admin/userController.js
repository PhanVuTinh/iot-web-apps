var express = require('express');
var service = require('../../services/service');
var config = require('../../config/config.json');
var userController = express.Router();
var http = require('http');
var request = require('request');
var passport = require('passport');
var moment = require('moment');


/* GET home page. */
userController.get('/taonguoidung', function(req, res) {
    console.log(req.session);
    res.render("admin/createUser");
});

userController.get("/danhsach", service.ensureAuthenticated, function(req, res) {
    res.render("admin/ListUser", { title: 'Xem danh sách người dùng', secu: config.securitycode, conf: config.urladdress, token: req.session.token, userid: req.session.userid, username: req.session.username, fullName: req.session.fullName });
});


userController.get('/sua/:id', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token;
    var id = req.params.id;
    var options = service.setOption('GET', config.urladdress + '/api/user/getbyid/' + id, { 'Authorization': token });
    service.get(options, function(error, data) {
        if (error) {
            return error;
        } else {
            data = JSON.parse(data);
            userData = data.data;
            console.log(userData);
            res.render('admin/updateuser', { title: 'Sửa thông tin người dùng', moment: moment, users: userData, secu: config.securitycode, conf: config.urladdress, token: req.session.token, userid: req.session.userid, username: req.session.username, fullName: req.session.fullName });
        }
    });
});

userController.post('/sua/:id', service.ensureAuthenticated, function(req, res) {
    console.log('Vao trong ruot');
    var token = "JWT " + req.session.token;
    var body = {
        user_fullName: req.body.user_fullName,
        user_userName: req.body.user_userName,
        user_birthday: req.body.user_birthday,
        user_phone: req.body.user_phone,
        user_email: req.body.user_email,
        user_address: req.body.user_address,
        user_onlineStatus: req.body.user_onlineStatus,
        user_sendSms: req.body.user_sendSms,
        role_id: req.body.role_id
    };
    console.log(body);
    var id = req.params.id;
    var options = service.setOption('put', config.urladdress + '/api/user/update/' + id, { 'Authorization': token, 'Content-Type': 'application/x-www-form-urlencoded' }, body);
    service.put(options, function(error, data) {
        if (error) {
            return error;
        } else {
            data = JSON.parse(data);
            var userData = data.data;
            Update(userData.user_id, userData.role_id, token, function(mes) {
                console.log(mes);
                res.redirect('/quantrac/nguoiquantri/nguoidung/danhsach');
            });
        }
    });
});

userController.get('/them', function(req, res) {
    console.log(req.session);
    token = "JWT " + req.session.token;
    res.render("admin/createUser", {
        title: 'Thêm người dùng mới',
        secu: config.securitycode,
        conf: config.urladdress,
        token: req.session.token,
        userid: req.session.userid,
        username: req.session.username,
        fullName: req.session.fullName
    });


});


userController.post('/them', service.ensureAuthenticated, function(req, res) {
    console.log('Vao trong ruot');
    var token = "JWT " + req.session.token;
    var body = {
        user_fullName: req.body.user_fullName,
        user_userName: req.body.user_userName,
        user_password: req.body.user_password,
        user_birthday: req.body.user_birthday,
        user_phone: req.body.user_phone,
        user_email: req.body.user_email,
        user_address: req.body.user_address,
        user_sendSms: req.body.user_sendSms,
        role_id: req.body.role_id
    };
    console.log(body);
    var id = req.params.id;
    var options = service.setOption('post', config.urladdress + '/api/user/create', { 'Authorization': token, 'Content-Type': 'application/x-www-form-urlencoded' }, body);
    service.post(options, function(error, data) {
        if (error) {
            return error;
        } else {
            _data = JSON.parse(data);
            var userData = _data.data;
            Add(userData.user_id, userData.role_id, token, function(mes) {
                console.log(mes);
                res.redirect('/quantrac/nguoiquantri/nguoidung/danhsach');
            });
        }

    });

});

userController.get('/khoa/:id', function(req, res) {
    console.log(req.session);
    token = "JWT " + req.session.token;
    var body = {
        user_fullName: req.body.user_fullName,
        user_userName: req.body.user_userName,
        user_birthday: req.body.user_birthday,
        user_phone: req.body.user_phone,
        user_email: req.body.user_email,
        user_address: req.body.user_address,
        user_onlineStatus: req.body.user_onlineStatus,
        user_sendSms: req.body.user_sendSms,
        role_id: req.body.role_id
    };
    var id = req.params.id;
    var options = service.setOption('put', config.urladdress + '/api/user/clockuser/' + id, { 'Authorization': token, 'Content-Type': 'application/x-www-form-urlencoded' }, body);
    service.put(options, function(error, data) {
        if (error) {
            return error;
        } else {
            res.redirect('/quantrac/nguoiquantri/nguoidung/danhsach');

        }
    });
});

userController.get('/mokhoa/:id', function(req, res) {
    console.log(req.session);
    token = "JWT " + req.session.token;
    var body = {
        user_fullName: req.body.user_fullName,
        user_userName: req.body.user_userName,
        user_birthday: req.body.user_birthday,
        user_phone: req.body.user_phone,
        user_email: req.body.user_email,
        user_address: req.body.user_address,
        user_onlineStatus: req.body.user_onlineStatus,
        user_sendSms: req.body.user_sendSms,
        role_id: req.body.role_id
    };
    var id = req.params.id;
    var options = service.setOption('put', config.urladdress + '/api/user/unclockuser/' + id, { 'Authorization': token, 'Content-Type': 'application/x-www-form-urlencoded' }, body);
    service.put(options, function(error, data) {
        if (error) {
            return error;
        } else {
            res.redirect('/quantrac/nguoiquantri/nguoidung/danhsach');
        }
    });

});


function postFunction(user_id, startfunc, endfunc, token, callback) {
    console.log(4);
    var body = {
        user_id: user_id,
        start: startfunc,
        end: endfunc
    };
    var options = service.setOption('post', config.urladdress + '/api/userfunction/create', { 'Authorization': token, 'Content-Type': 'application/x-www-form-urlencoded' }, body);
    service.post(options, function(error, data) {
        if (error) {
            alert("Không thêm được chức năng cho người dùng này!");
        } else {
            console.log(data);
            callback();
        }
    });

}

function Add(user_id, roleid, token, callback) {
    console.log("uid:" + user_id + "rid:" + roleid);
    if (roleid == '1') {
        getfunctiongroupidbyrole('admin', token, function(datafg) {
            datafg = JSON.parse(datafg);
            var fgData = datafg.data;
            var lengthfg = datafg.length;
            postFunctionGroup(user_id, fgData[0].function_group_id, fgData[lengthfg - 1].function_group_id, token, function() {
                getfunctionidbyrole('admin', token, function(data) {
                    dataf = JSON.parse(data);
                    var fData = dataf.data;
                    var lengthf = dataf.length;
                    postFunction(user_id, fData[0].function_id, fData[lengthf - 1].function_id, token, function() {
                        callback("Done!");
                    });
                });
            });
        });
    } else if (roleid == '3') {
        getfunctiongroupidbyrole('farmer', token, function(datafg) {
            datafg = JSON.parse(datafg);
            var fgData = datafg.data;
            var lengthfg = datafg.length;
            postFunctionGroup(user_id, fgData[0].function_group_id, fgData[lengthfg - 1].function_group_id, token, function() {
                getfunctionidbyrole('farmer', token, function(data) {
                    dataf = JSON.parse(data);
                    var fData = dataf.data;
                    var lengthf = dataf.length;
                    postFunction(user_id, fData[0].function_id, fData[lengthf - 1].function_id, token, function() {
                        callback("Done!");
                    });
                });
            });
        });
    } else if (roleid == '4') {
        getfunctiongroupidbyrole('manager', token, function(datafg) {
            datafg = JSON.parse(datafg);
            var fgData = datafg.data;
            var lengthfg = datafg.length;
            postFunctionGroup(user_id, fgData[0].function_group_id, fgData[lengthfg - 1].function_group_id, token, function() {
                getfunctionidbyrole('manager', token, function(data) {
                    dataf = JSON.parse(data);
                    var fData = dataf.data;
                    var lengthf = dataf.length;
                    postFunction(user_id, fData[0].function_id, fData[lengthf - 1].function_id, token, function() {
                        callback("Done!");
                    });
                });
            });
        });
    } else if (roleid == '5') {
        getfunctiongroupidbyrole('expert', token, function(datafg) {
            datafg = JSON.parse(datafg);
            var fgData = datafg.data;
            var lengthfg = datafg.length;
            postFunctionGroup(user_id, fgData[0].function_group_id, fgData[lengthfg - 1].function_group_id, token, function() {
                getfunctionidbyrole('expert', token, function(data) {
                    dataf = JSON.parse(data);
                    var fData = dataf.data;
                    var lengthf = dataf.length;
                    postFunction(user_id, fData[0].function_id, fData[lengthf - 1].function_id, token, function() {
                        callback("Done!");
                    });
                });
            });
        });
    }
}

function postFunctionGroup(user_id, startfunc, endfunc, token, callback) {
    console.log("2");
    var body = {
        user_id: user_id,
        start: startfunc,
        end: endfunc
    };
    var options = service.setOption('post', config.urladdress + '/api/userfunctiongroup/create', { 'Authorization': token, 'Content-Type': 'application/x-www-form-urlencoded' }, body);
    service.post(options, function(error, data) {
        if (error) {
            alert("Không thêm được chức năng cho người dùng này!");
        } else {
            console.log(data);
            callback();
        }
    });
}

function getfunctiongroupidbyrole(role, token, callback) {
    console.log("1");
    var options = service.setOption('get', config.urladdress + '/api/functiongroup/getidbyrole/' + role, {
        'Authorization': token
    });
    service.post(options, function(err, data) {
        if (err) {
            alert(err);
        } else {
            callback(data);
        }
    });
}

function getfunctionidbyrole(role, token, callback) {
    console.log("3");
    var options = service.setOption('get', config.urladdress + '/api/function/getidbyrole/' + role, {
        'Authorization': token,
        'Content-Type': 'application/x-www-form-urlencoded'
    });
    service.post(options, function(err, data) {
        if (err) {
            alert(err);
        } else {
            callback(data);
        }
    });
}

function Update(userid, role, token, callback) {
    Delete(userid, token, function() {
        Add(use, role, token, function() {
            callback("Done!");
        })
    })
}

function Delete(userid, token, callback) {
    deleteFunctionGroup(userid, token, function() {
        deleteFunction(userid, token);
    })
}

function deleteFunctionGroup(userid, token, callback) {
    var options = service.setOption('delete', config.urladdress + '/api/functiongroup/delete/' + userid, {
        'Authorization': token,
    });
    service.post(options, function(err, data) {
        if (err) {
            alert(err);
        } else {
            console.log("Xoa duoc");
            callback();
        }
    });
}

function deleteFunction(userid, token, callback) {
    var options = service.setOption('delete', config.urladdress + '/api/function/delete/' + userid, {
        'Authorization': token,
    });
    service.post(options, function(err, data) {
        if (err) {
            alert(err);
        } else {
            console.log("Xoa duoc");
            callback("Done!");
        }
    });
}

module.exports = userController;