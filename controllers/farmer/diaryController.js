var express = require('express');
var service = require('../../services/service'); // Ham ho tro goi API
var service1 = require('../../service');
var config = require('../../config/config.json'); //Dia chi host API
var moment = require('moment'); //Thu vien format ngay phia giao dien
var diaryController = express.Router();
/**
 * @name nhatkinuoitom /
 * @param 
 * @description get nhật danh sách nhật kí nuôi tôm
 */
// diaryController.get('/',service.ensureAuthenticated,function(req,res){
// 	var token = "JWT " + req.session.token; // Token de goi API
//     res.render('farmer/diary/index',
//         {	
//             title:'Nhật Ký Nuôi Tôm',
// 			conf:config.urladdress,
// 			token:token,
// 			userId:req.user.id,
// 			fullName: req.session.fullName,
// 			moment:moment
//         }
//     );
// });
diaryController.get('/', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    var method = 'GET';
    var url = config.urladdress + '/api/user/getbyid/' + req.user.id;
    var headers = {
        'Authorization': token,
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    var option = service.setOption(method, url, headers);
    service.get(option, function(error, result) {
        if (error) {
            return error;
        } else {
            var result = JSON.parse(result);
            if (result.Error) {
                return new Error();

            } else {

                res.render('farmer/diary/index', {
                    title: 'Nhật Ký Nuôi Tôm',
                    conf: config.urladdress,
                    token: token,
                    userId: req.user.id,
                    fullName: req.session.fullName,
                    userPhone: result.data.user_phone,
                    moment: moment,
                    secu: config.securitycode,
                    userid: req.user.id,
                });
            }
        }
    });

});

diaryController.get('/themcbiao', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    res.render('farmer/diary/addPreparpond', {
        title: 'Thêm chuẩn bị ao',
        conf: config.urladdress,
        token: token,
        userId: req.user.id,
        fullName: req.session.fullName,
        moment: moment,
        secu: config.securitycode,
        userid: req.user.id
    });
});

diaryController.get('/themcbivatlieu', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    res.render('farmer/diary/addMaterialPrepar', {
        title: 'Thêm chuẩn bị vật liệu',
        conf: config.urladdress,
        token: token,
        userId: req.user.id,
        fullName: req.session.fullName,
        moment: moment,
        secu: config.securitycode,
        userid: req.user.id
    });
});

diaryController.get('/themcbithaao', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    res.render('farmer/diary/addStockPond', {
        title: 'Thêm chuẩn bị thả ao',
        conf: config.urladdress,
        token: token,
        userId: req.user.id,
        fullName: req.session.fullName,
        moment: moment,
        secu: config.securitycode,
        userid: req.user.id,
    });
});

diaryController.get('/themtdttruong', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    res.render('farmer/diary/addTrackeraugmented', {
        title: 'Thêm theo dõi tăng trưởng',
        conf: config.urladdress,
        token: token,
        userId: req.user.id,
        fullName: req.session.fullName,
        moment: moment,
        secu: config.securitycode,
        userid: req.user.id,
    });
});
diaryController.get('/themanthuoc', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    res.render('farmer/diary/addFoodAndMedicine', {
        title: 'Thêm theo dõi thức ăn & thuốc',
        conf: config.urladdress,
        token: token,
        userId: req.user.id,
        fullName: req.session.fullName,
        moment: moment,
        secu: config.securitycode,
        userid: req.user.id,
    });
});
diaryController.get('/themthuhoach', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    res.render('farmer/diary/addHarvest', {
        title: 'Thêm thu hoạch',
        conf: config.urladdress,
        token: token,
        userId: req.user.id,
        fullName: req.session.fullName,
        moment: moment,
        secu: config.securitycode,
        userid: req.user.id,
    });
});
/**
 * @name post /themnhatki
 * @param data body
 * @description post them nhat ki
 */
diaryController.post('/them', service1.ensureAuthenticated, function(req, res) {
    var pond_id = req.body.pond_id;
    var stocking_id = req.body.stocking_id;
    var startday_id = req.body.startdate_id;
    var land_id = req.body.land_id;
    var dophdat_id = req.body.dophdat_id;
    var hinhthuccaitao_id = req.body.hinhthuccaitao_id;
    var congsuatquatnuoc_id = req.body.congsuatquatnuoc_id;
    var socanhquatmay_id = req.body.socanhquatmay_id;
    var token = "JWT " + req.session.token;
    var options = {
        url: config.urladdress + '/api/pondpreparation/create',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        form: {
            pond_id: pond_id,
            stocking_id: stocking_id,
            landbg_id: land_id,
            pondpreparation_dateStart: startday_id,
            pondpreparation_soilPH: dophdat_id,
            pondpreparation_capacityOfFan: congsuatquatnuoc_id,
            pondpreparation_quantityOfFan: socanhquatmay_id
        }
    };
    service1.post(options, function(error, data) {
        if (error) {
            return error;
        }
        res.redirect('/quantrac/nongdan/nhatki/themcbiao');
    });
});
diaryController.post('/themtangtruong', service1.ensureAuthenticated, function(req, res) {
    console.log("Success");
    var pond_id_2 = req.body.pond_id_2;
    var stocking_id_2 = req.body.stocking_id_2;
    var startday_id = req.body.startdate_id;
    var trackeraugmented_number = req.body.trackeraugmented_number;
    var trackeraugmented_date = req.body.trackeraugmented_date;
    var trackeraugmented_age = req.body.trackeraugmented_age;
    var trackeraugmented_densityAvg = req.body.trackeraugmented_densityAvg;
    var trackeraugmented_weightAvg = req.body.trackeraugmented_weightAvg;
    var trackeraugmented_speedOfGrowth = req.body.trackeraugmented_speedOfGrowth;
    var tracker_augmented_survival = req.body.tracker_augmented_survival;
    var trackeraugmented_biomass = req.body.trackeraugmented_biomass;
    var trackeraugmented_note = req.body.trackeraugmented_note;

    var token = "JWT " + req.session.token;
    console.log(token);
    var options = {
        url: config.urladdress + '/api/trackeraugmented/create',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        form: {
            pond_id: pond_id_2,
            stocking_id: stocking_id_2,
            trackeraugmented_number: trackeraugmented_number,
            trackeraugmented_date: trackeraugmented_date,
            trackeraugmented_age: trackeraugmented_age,
            trackeraugmented_densityAvg: trackeraugmented_densityAvg,
            trackeraugmented_weightAvg: trackeraugmented_weightAvg,
            trackeraugmented_speedOfGrowth: trackeraugmented_speedOfGrowth,
            tracker_augmented_survival: tracker_augmented_survival,
            trackeraugmented_biomass: trackeraugmented_biomass,
            trackeraugmented_note: trackeraugmented_note
        }
    };
    console.log(options);
    service1.post(options, function(error, data) {
        if (error) {
            return error;
        }
        res.redirect('/quantrac/nongdan/nhatki/themtdttruong');
    });
});

diaryController.post('/themthaao', service1.ensureAuthenticated, function(req, res) {
    console.log("Success");
    var pond_id_3 = req.body.pond_id_3;
    var stocking_id_3 = req.body.stocking_id_3;
    var seed_id = req.body.seed_id;
    var stockpond_date = req.body.stockpond_date;
    var stockpond_PCR = req.body.stockpond_PCR;
    var stockpond_PCRresult = req.body.stockpond_PCRresult;
    var stockpond_density = req.body.stockpond_density;
    var stockpond_quantityStock = req.body.stockpond_quantityStock;
    var stockpond_statusOfSeed = req.body.stockpond_statusOfSeed;
    var stockpond_method = req.body.stockpond_method;
    var stockpond_depth = req.body.stockpond_depth;
    var stockpond_clarity = req.body.stockpond_clarity;
    var stockpond_salinity = req.body.stockpond_salinity;
    var stockpond_DO = req.body.stockpond_DO;
    var stockpond_PHwater = req.body.stockpond_PHwater;
    var stockpond_tempAir = req.body.stockpond_tempAir;
    var stockpond_tempWater = req.body.stockpond_tempWater;
    var stockpond_state = req.body.stockpond_state;
    var stockpond_age = req.body.stockpond_age;

    var token = "JWT " + req.session.token;
    console.log(token);
    var options = {
        url: config.urladdress + '/api/stockingpond/create',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        form: {
            stocking_id: stocking_id_3,
            pond_id: pond_id_3,
            seed_id: seed_id,
            stockpond_date: stockpond_date,
            stockpond_PCR: stockpond_PCR,
            stockpond_PCRresult: stockpond_PCRresult,
            stockpond_density: stockpond_density,
            stockpond_quantityStock: stockpond_quantityStock,
            stockpond_statusOfSeed: stockpond_statusOfSeed,
            stockpond_method: stockpond_method,
            stockpond_depth: stockpond_depth,
            stockpond_clarity: stockpond_clarity,
            stockpond_salinity: stockpond_salinity,
            stockpond_DO: stockpond_DO,
            stockpond_PHwater: stockpond_PHwater,
            stockpond_tempAir: stockpond_tempAir,
            stockpond_tempWater: stockpond_tempWater,
            stockpond_state: stockpond_state,
            stockpond_age: stockpond_age
        }
    };
    console.log(options);
    service1.post(options, function(error, data) {
        if (error) {
            return error;
        }
        res.redirect('/quantrac/nongdan/nhatki/themcbithaao');
    });
});

/**
 * @name get /chitiet
 * @param pond_id, stoking_id
 * @description get chi tiết nhật kí nuôi tôm
 */
diaryController.get('/chitiet/:id', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    res.render('farmer/diary/diaryDetail', {
        title: 'Nhật Kí Nuôi Tôm',
        conf: config.urladdress,
        token: token,
        userId: req.user.id,
        fullName: req.session.fullName,
        moment: moment,
        secu: config.securitycode,
        userid: req.user.id,
    });
});

/* hiển thị chi tiết*/
diaryController.get('/chitiet/:pondid/:stockingid', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    // var diaryId = req.params.id;
    var pondId = req.params.pondid;
    var stockingId = req.params.stockingid;
    var method = 'GET';
    var url = config.urladdress + '/api/user/getbyid/' + req.user.id;
    var headers = {
        'Authorization': token,
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    var option = service.setOption(method, url, headers);
    service.get(option, function(error, result) {
        if (error) {
            return error;
        } else {
            var result = JSON.parse(result);
            if (result.Error) {
                return new Error();
            } else {
                res.render('farmer/diary/diaryDetail', {
                    title: 'Nhật Kí Nuôi Tôm',
                    conf: config.urladdress,
                    token: token,
                    userId: req.user.id,
                    fullName: req.session.fullName,
                    moment: moment,
                    pondId: pondId,
                    stockingId: stockingId,
                    userPhone: result.data.user_phone,
                    secu: config.securitycode,
                    userid: req.user.id,
                });
            }
        }
    });
});
/* cập nhật*/
diaryController.get('/capnhat/:pondid/:stockingid', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    //var diaryId = req.params.id;
    var pondId = req.params.pondid;
    var stockingId = req.params.stockingid;

    res.render('farmer/diary/editDiary2', {
        title: 'Nhật Kí Nuôi Tôm',
        conf: config.urladdress,
        token: token,
        userId: req.user.id,
        fullName: req.session.fullName,
        moment: moment,
        pondId: pondId,
        stockingId: stockingId,
        secu: config.securitycode,
        userid: req.user.id,
    });
});
/* cập nhật tăng trưởng theo id*/
diaryController.get('/capnhattangtruong/:id', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    var trackeraugmentedId = req.params.id;
    res.render('farmer/diary/edits/capnhattangtruong', {
        title: 'Nhật Kí Nuôi Tôm',
        conf: config.urladdress,
        token: token,
        userId: req.user.id,
        fullName: req.session.fullName,
        moment: moment,
        trackeraugmentedId: trackeraugmentedId,
        secu: config.securitycode,
        userid: req.user.id,
    });
});
/* cập nhật thu hoạch*/
diaryController.get('/capnhatthuhoach/:id/:id2/:id3', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    var harvedetaNumber = req.params.id;
    var harvestId = req.params.id2;
    var prodtypeId = req.params.id3;
    res.render('farmer/diary/edits/capnhatthuhoach', {
        title: 'Nhật Kí Nuôi Tôm',
        conf: config.urladdress,
        token: token,
        userId: req.user.id,
        fullName: req.session.fullName,
        moment: moment,
        harvedetaNumber: harvedetaNumber,
        harvestId: harvestId,
        prodtypeId: prodtypeId,
        secu: config.securitycode,
        userid: req.user.id,
    });
});
/**
 * cập nhật vật liệu chuẩn bị ao
 */
diaryController.get('/capnhatvatlieuchuanbiao/:id/:id2', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    var pondpreparationId = req.params.id;
    var materialId = req.params.id2;
    res.render('farmer/diary/edits/capnhatvatlieu', {
        title: 'Nhật Kí Nuôi Tôm',
        conf: config.urladdress,
        token: token,
        userId: req.user.id,
        fullName: req.session.fullName,
        moment: moment,
        pondpreparationId: pondpreparationId,
        materialId: materialId,
        secu: config.securitycode.address,
        userid: req.user.id,
    });
});
diaryController.post('/capnhatvatlieu', service.ensureAuthenticated, function(req, res) {
    var pondpreparation_id = req.body.pondpreparation_id;
    var material_id = req.body.material_id_1;
    var material_id_1 = req.body.material_id;
    var matepredetail_quantity = req.body.matepredetail_quantity;
    var matepredetail_date = req.body.matepredetail_date;
    var matepredetail_note = req.body.matepredetail_note;
    var matepredetail_number = req.body.matepredetail_number;

    var token = "JWT " + req.session.token;
    var address = config.urladdress + '/api/materialpreparationdetail/update?pondpreparation_id=' + pondpreparation_id + '&material_id=' + material_id;
    var options = {
        method: 'PUT', //muon cap nhat du lieu phai them method la put
        url: address,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        form: {
            pondpreparation_id: pondpreparation_id,
            material_id: material_id_1,
            matepredetail_quantity: matepredetail_quantity,
            matepredetail_date: matepredetail_date,
            matepredetail_note: matepredetail_note,
            matepredetail_number: matepredetail_number
        }
    };
    service.put(options, function(error, data) {
        if (error) {
            return error;
        } else {
            res.redirect('/quantrac/nongdan/nhatki');
        }
    });
});

diaryController.post('/capnhatchuanbiao', service.ensureAuthenticated, function(req, res) {
    var pondpreparation_id = req.body.pondpreparation_id;
    var pond_id = req.body.pond_id;
    var stocking_id = req.body.stocking_id;
    var landbg_id = req.body.landbg_id;
    var pondpreparation_dateStart = req.body.pondpreparation_dateStart;
    var pondpreparation_soilPH = req.body.pondpreparation_soilPH;
    var pondpreparation_capacityOfFan = req.body.pondpreparation_capacityOfFan;
    var pondpreparation_quantityOfFan = req.body.pondpreparation_quantityOfFan;

    var token = "JWT " + req.session.token;
    var address = config.urladdress + '/api/pondpreparation/update/' + pondpreparation_id;
    var options = {
        method: 'PUT', //muon cap nhat du lieu phai them method la put
        url: address,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        form: {
            pondpreparation_id: pondpreparation_id,
            pond_id: pond_id,
            stocking_id: stocking_id,
            landbg_id: landbg_id,
            pondpreparation_dateStart: pondpreparation_dateStart,
            pondpreparation_soilPH: pondpreparation_soilPH,
            pondpreparation_capacityOfFan: pondpreparation_capacityOfFan,
            pondpreparation_quantityOfFan: pondpreparation_quantityOfFan,
        }
    };
    service.put(options, function(error, data) {
        if (error) {
            return error;
        } else {
            res.redirect('/quantrac/nongdan/nhatki');
        }
    });
});

diaryController.post('/capnhatthagiong', service.ensureAuthenticated, function(req, res) {
    var pond_id = req.body.pond_id;
    var stocking_id = req.body.stocking_id;
    var seed_id = req.body.seed_id;
    var stockpond_date = req.body.stockpond_date;
    var stockpond_PCR = req.body.stockpond_PCR;
    var stockpond_PCRresult = req.body.stockpond_PCRresult;
    var stockpond_density = req.body.stockpond_density;
    var stockpond_quantityStock = req.body.stockpond_quantityStock;
    var stockpond_method = req.body.stockpond_method;
    var stockpond_depth = req.body.stockpond_depth;
    var stockpond_clarity = req.body.stockpond_clarity;
    var stockpond_salinity = req.body.stockpond_salinity;
    var stockpond_DO = req.body.stockpond_DO;
    var stockpond_PHwater = req.body.stockpond_PHwater;
    var stockpond_tempAir = req.body.stockpond_tempAir;
    var stockpond_tempWater = req.body.stockpond_tempWater;
    var stockpond_age = req.body.stockpond_age;
    var stockpond_statusOfSeed = req.body.stockpond_statusOfSeed;
    var stockpond_state = req.body.stockpond_state;
    var token = "JWT " + req.session.token;
    var address = config.urladdress + '/api/stockingpond/update?stocking_id=' + stocking_id + '&pond_id=' + pond_id;
    var options = {
        method: 'PUT', //muon cap nhat du lieu phai them method la put
        url: address,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        form: {
            pond_id: pond_id,
            stocking_id: stocking_id,
            seed_id: seed_id,
            stockpond_date: stockpond_date,
            stockpond_PCR: stockpond_PCR,
            stockpond_PCRresult: stockpond_PCRresult,
            stockpond_density: stockpond_density,
            stockpond_quantityStock: stockpond_quantityStock,
            stockpond_method: stockpond_method,
            stockpond_depth: stockpond_depth,
            stockpond_clarity: stockpond_clarity,
            stockpond_salinity: stockpond_salinity,
            stockpond_DO: stockpond_DO,
            stockpond_PHwater: stockpond_PHwater,
            stockpond_tempAir: stockpond_tempAir,
            stockpond_tempWater: stockpond_tempWater,
            stockpond_age: stockpond_age,
            stockpond_statusOfSeed: stockpond_statusOfSeed,
            stockpond_state: stockpond_state
        }
    };
    service.put(options, function(error, data) {
        if (error) {
            return error;
        } else {
            res.redirect('/quantrac/nongdan/nhatki');
        }
    });
});

diaryController.post('/capnhathuhoach', service.ensureAuthenticated, function(req, res) {
    var harvest_id = req.body.harvest_id;
    var user_id = req.body.user_id;
    var stocking_id = req.body.stocking_id;
    var harvest_harvestDate = req.body.harvest_harvestDate;

    var harvedeta_number = req.body.harvedeta_number;
    var harvest_id = req.body.harvest_id;
    var prodtype_id = req.body.prodtype_id;

    var prodtype_id_goc = req.body.prodtype_id_goc;

    var pond_id = req.body.pond_id;
    var unit_id = req.body.unit_id;
    var harvedeta_price = req.body.harvedeta_price;
    var harvedeta_weight = req.body.harvedeta_weight;
    var harvedeta_note = req.body.harvedeta_note;

    var token = "JWT " + req.session.token;
    var address = config.urladdress + '/api/harvest/update/' + harvest_id;
    var options = {
        method: 'PUT', //muon cap nhat du lieu phai them method la put
        url: address,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        form: {
            harvest_id: harvest_id,
            user_id: user_id,
            stocking_id: stocking_id,
            harvest_harvestDate: harvest_harvestDate
        }
    };
    service.put(options, function(error, data) {
        if (error) {
            return error;
        } else {
            //res.redirect('/quantrac/nongdan/nhatki');
            var address1 = config.urladdress + '/api/harvestdetail/update?harvest_id=' + harvest_id + '&prodtype_id=' + prodtype_id_goc + '&harvedeta_number=' + harvedeta_number;
            var options1 = {
                method: 'PUT', //muon cap nhat du lieu phai them method la put
                url: address1,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token
                },
                form: {
                    harvedeta_number: harvedeta_number,
                    harvest_id: harvest_id,
                    prodtype_id: prodtype_id,
                    pond_id: pond_id,
                    unit_id: unit_id,
                    harvedeta_price: harvedeta_price,
                    harvedeta_weight: harvedeta_weight,
                    harvedeta_note: harvedeta_note
                }
            };
            service.put(options1, function(error, data) {
                if (error) {
                    return error;
                } else {
                    res.redirect('/quantrac/nongdan/nhatki');
                }
            });
        }
    });
});
diaryController.post('/capnhattangtruong', service.ensureAuthenticated, function(req, res) {
    var trackeraugmented_id = req.body.trackeraugmented_id;
    var pond_id = req.body.pond_id;
    var stocking_id = req.body.stocking_id;
    var trackeraugmented_number = req.body.trackeraugmented_number;
    var trackeraugmented_date = req.body.trackeraugmented_date;
    var trackeraugmented_age = req.body.trackeraugmented_age;
    var trackeraugmented_densityAvg = req.body.trackeraugmented_densityAvg;
    var trackeraugmented_weightAvg = req.body.trackeraugmented_weightAvg;
    var trackeraugmented_speedOfGrowth = req.body.trackeraugmented_speedOfGrowth;
    var tracker_augmented_survival = req.body.tracker_augmented_survival;
    var trackeraugmented_biomass = req.body.trackeraugmented_biomass;
    var trackeraugmented_note = req.body.trackeraugmented_note;

    var token = "JWT " + req.session.token;
    var address = config.urladdress + '/api/trackeraugmented/update/' + trackeraugmented_id;
    var options = {
        method: 'PUT', //muon cap nhat du lieu phai them method la put
        url: address,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        form: {
            trackeraugmented_id: trackeraugmented_id,
            pond_id: pond_id,
            stocking_id: stocking_id,
            trackeraugmented_number: trackeraugmented_number,
            trackeraugmented_date: trackeraugmented_date,
            trackeraugmented_age: trackeraugmented_age,
            trackeraugmented_densityAvg: trackeraugmented_densityAvg,
            trackeraugmented_weightAvg: trackeraugmented_weightAvg,
            trackeraugmented_speedOfGrowth: trackeraugmented_speedOfGrowth,
            tracker_augmented_survival: tracker_augmented_survival,
            trackeraugmented_biomass: trackeraugmented_biomass,
            trackeraugmented_note: trackeraugmented_note
        }
    };
    service.put(options, function(error, data) {
        if (error) {
            return error;
        } else {
            res.redirect('/quantrac/nongdan/nhatki');
        }
    });
});
diaryController.get('/themchitietthuhoach', service.ensureAuthenticated, function(req, res) {
    var token = "JWT " + req.session.token; // Token de goi API
    res.render('farmer/diary/addHarvestDetail', {
        title: 'Thêm chi tiết thu hoạch',
        conf: config.urladdress,
        token: token,
        userId: req.user.id,
        fullName: req.session.fullName,
        moment: moment,
        secu: config.securitycode,
        userid: req.user.id,
    });
});

/* hàm thêm chi tiết thu hoạch (tích hợp thêm)*/
diaryController.post('/themctthuhoach', service1.ensureAuthenticated, function(req, res) {
    var pond_id = req.body.pond_id;
    var harvest_id = req.body.harvest_id;
    var harvedeta_number = req.body.harvedeta_number;
    var prodtype_id = req.body.prodtype_id;
    var unit_id = req.body.unit_id;
    var harvedeta_price = req.body.harvedeta_price;
    var harvedeta_weight = req.body.harvedeta_weight;
    var harvedeta_note = req.body.harvedeta_note;
    var token = "JWT " + req.session.token;
    var options = {
        url: config.urladdress + '/api/harvestdetail/create',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        form: {
            pond_id: pond_id,
            harvest_id: harvest_id,
            harvedeta_number: harvedeta_number,
            prodtype_id: req.body.prodtype_id,
            unit_id: unit_id,
            harvedeta_price: harvedeta_price,
            harvedeta_weight: harvedeta_weight,
            harvedeta_note: harvedeta_note
        }
    };
    console.log(options);
    service1.post(options, function(error, data) {
        if (error) {
            return error;
        }
        res.redirect('/quantrac/nongdan/nhatki/themchitietthuhoach');
    });
});
module.exports = diaryController;