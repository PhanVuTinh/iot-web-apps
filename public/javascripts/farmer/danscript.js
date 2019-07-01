/**
 * ====================phần mới thêm vào dưới đây=======================
 * ====================Son Thanh Dan====================================
 */

/**
 * @name Hàm lấy về danh sách thức ăn
 * @description lấy material theo material type id
 */
function getListMaterialTypeFood(conf, token, userid, index, pagesize) {
    // console.log('getListMaterialTypeFood');
    var ajaxConfig = {
        url: conf + '/api/material/getbymaterialtype/2',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{ }
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        if (rs.Error) {
            console.log('Không lấy được danh sách material, nhấn F5 để tải lại trang');
        } else {
            feedArrayItem = rs.data; //
            $('#pagination-container').pagination({
                dataSource: feedArrayItem,
                pageSize: 5,
                callback: function(data, pagination) {
                    var html = '';
                    data.forEach(function(Item) {
                        html +=
                            '<tr class="tr">' +
                            '<td class="text-center">' + Item.material_id + '</td>' +
                            '<td class="text-center">' + Item.material_numberOfLot + '</td>' +
                            '<td class="text-center">' + ((Item.materialtype_id == 2) ? 'Thức Ăn' : '') + '</td>' +
                            '<td class="text-center">' + Item.material_name + '</td>' +
                            '<td class="text-center">' + Item.material_source + '</td>' +
                            '<td class="text-center">' + Item.material_quantity + '</td>' +
                            '<td class="text-center">' + Item.material_existence + '</td>' +
                            '<td class="text-center">' + Item.material_price + '</td>' +
                            '<td class="text-center">' + Item.bill_id + '</td>' +
                            '<td class="text-center"><a title="Xoá vật tư" href="#" onclick="deleteMaterialTypeFood(' + "'" + conf + "'" + ',' + "'" + token + "'" + ',' + "'" + userid + "'" + ',' + Item.material_id + ')"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></a></td>' +
                            '</tr>';
                    });
                    $('#listMaterialTypeFeed').html(html);
                }
            });

        }
    });
    request.fail(function(jqXHR, textStatus) {
        console.log('Không lấy được danh sách material, nhấn F5 để tải lại trang');
    });

}
/**
 * @name Hàm xoá thức ăn
 * @description xoá material theo material type id
 */
function deleteMaterialTypeFood(conf, token, userid, idMaterialTypeFood) {
    alert('call deleteMaterialTypeFood(' + idMaterialTypeFood + ')');
    // queryString = DELETE FROM `material` WHERE `material`.`material_id` = 24
}
/**
 * @name Hàm lấy về danh sách thuốc 
 * @description lấy material theo material type id
 */
function getListMaterialTypeMedicine(conf, token, userid, index, pagesize) {
    var ajaxConfig = {
        url: conf + '/api/material/getbymaterialtype/1',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        if (rs.Error) {
            console.log('Không lấy được danh sách material, nhấn F5 để tải lại trang');
        } else {
            medicineArrayItem = rs.data; //
            // phân trang
            $('#pagination-container-medicine').pagination({
                dataSource: medicineArrayItem,
                pageSize: 5,
                callback: function(data, pagination) {
                    var html = '';
                    data.forEach(function(Item) {
                        html +=
                            '<tr class="tr">' +
                            '<td>' + Item.material_id + '</td>' +
                            '<td>' + Item.material_numberOfLot + '</td>' +
                            '<td>' + ((Item.materialtype_id == 1) ? 'Thuốc' : '') + '</td>' +
                            '<td>' + Item.material_name + '</td>' +
                            '<td>' + Item.material_source + '</td>' +
                            '<td>' + Item.material_quantity + '</td>' +
                            '<td>' + Item.material_existence + '</td>' +
                            '<td>' + Item.material_price + '</td>' +
                            '<td>' + Item.bill_id + '</td>' +
                            '<td><a title="Cập nhật" href="#" onclick="deleteMaterialTypeMedicine(' + "'" + conf + "'" + ',' + "'" + token + "'" + ',' + "'" + userid + "'" + ',' + Item.material_id + ')"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></a></td>' +
                            '</tr>';
                    });
                    $('#listMaterialTypeMedicine').html(html);

                }
            });

        }
    });
    request.fail(function(jqXHR, textStatus) {
        console.log('Không lấy được danh sách material, nhấn F5 để tải lại trang');
    });
}
/**
 * @name Hàm xoá thuốc
 * @description xoá material theo material type id
 */
function deleteMaterialTypeMedicine(conf, token, userid, idMaterialTypeMedicine) {
    alert('deleteMaterialTypeMedicine(' + idMaterialTypeMedicine + ')')
}
/**
 * @name Hàm lấy về danh sách chế phẩm sinh học
 * @description lấy material theo material type id
 */
function getListMaterialTypeMedicineBio(conf, token, userid, index, pagesize) {
    var ajaxConfig = {
        url: conf + '/api/material/getbymaterialtype/3',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        if (rs.Error) {
            console.log('Không lấy được danh sách material, nhấn F5 để tải lại trang');
        } else {
            medicineBioArrayItem = rs.data; //
            $('#pagination-container-medicine-bio').pagination({
                dataSource: medicineBioArrayItem,
                pageSize: 3,
                callback: function(data, pagination) {
                    var html = '';
                    data.forEach(function(Item) {
                        html +=
                            '<tr class="tr">' +
                            '<td>' + Item.material_id + '</td>' +
                            '<td>' + Item.material_numberOfLot + '</td>' +
                            '<td>' + ((Item.materialtype_id == 3) ? 'Chế Phẩm Sinh Học' : '') + '</td>' +
                            '<td>' + Item.material_name + '</td>' +
                            '<td>' + Item.material_source + '</td>' +
                            '<td>' + Item.material_quantity + '</td>' +
                            '<td>' + Item.material_existence + '</td>' +
                            '<td>' + Item.material_price + '</td>' +
                            '<td>' + Item.bill_id + '</td>' +
                            '<td><a title="Cập nhật" href="#" onclick="deleteMaterialTypeMedicineBio(' + "'" + conf + "'" + ',' + "'" + token + "'" + ',' + "'" + userid + "'" + ',' + Item.material_id + ')"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></a></td>' +
                            '</tr>';
                    });
                    $('#listMaterialTypeMedicineBio').html(html);

                }
            });
        }
    });
    request.fail(function(jqXHR, textStatus) {
        console.log('Không lấy được danh sách material, nhấn F5 để tải lại trang');
    });
}
/**
 * @name Hàm xoá chế phẩm sinh học
 * @description xoá material theo material type id
 */
function deleteMaterialTypeMedicineBio(conf, token, userid, idMaterialTypeMedicineBio) {
    alert('deleteMaterialTypeMedicineBio(' + idMaterialTypeMedicineBio + ')')
}
/**
 * @name Hàm lấy danh sách lịch sử dịch bệnh
 * @description 
 */
function getListHistorySick(conf, token, userId) {
    var ajaxConfig = {
        url: conf + '/api/sick/getall',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    };
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {

        if (rs.Error) {
            console.log('Không lấy được danh sách material, nhấn F5 để tải lại trang');
        } else {
            historySickArrayItem = rs.data; //
            $('#pagination-container-history-sick').pagination({
                dataSource: historySickArrayItem,
                pageSize: 3,
                callback: function(data, pagination) {
                    var html = '';
                    data.forEach(function(Item) {
                        html +=
                            '<li>' +
                            '<div class="timeline-badge info"><i class="fa fa-smile-o"></i></div>' +
                            '<div class="timeline-panel">' +
                            '<div class="timeline-heading">' +
                            '<h4 class="timeline-title" >' + Item.sick_name.toUpperCase() + '</h4>' +
                            '<span id="' + Item.sick_id + '" hidden="true">' + Item.sick_id + '</span>' +
                            '</div>' +
                            '<div class="timeline-body">' +
                            '<h4 >Ngày ghi nhận:  ' + Item.sick_createdDate + '| Ao: ' + Item.pond_id + '| Đợt:' + Item.stocking_id + '</p>' +
                            // '<h4>Mô Tả: , ảnh</h4>'+
                            // '<p style="font-size: 16px" id="">'+ Item.sick_description +'</p>'+
                            '<h4>Dấu hiệu:</h4>' +
                            '<div >' +
                            '<ul id="symptom-ul"></ul>' +
                            '</div>' +
                            '<h4>Tác Nhân:</h4>' +
                            '<div >' +
                            '<ul id="agent-ul"></ul>' +
                            '</div>' +
                            '<h4>Phòng Trị Bệnh :</h4>' +
                            '<div >' +
                            '<ul id="treatment-ul"></ul>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</li>';
                        // dau hieu
                        $.ajax({
                            url: conf + '/api/symptom/getbysickid/' + Item.sick_id,
                            method: 'GET',
                            contentType: 'application/json; charset=utf-8',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Authorization': token
                            },
                            success: function(resJSon) {
                                var arrItem = resJSon.data;
                                arrItem.forEach(function(item) {
                                    $('#symptom-ul').append('<li>' + item.symptom_description + '</li>');
                                });
                            }
                        });
                        // tac nhan
                        $.ajax({
                            url: conf + '/api/agent/getbysickid/' + Item.sick_id,
                            method: 'GET',
                            contentType: 'application/json; charset=utf-8',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Authorization': token
                            },
                            success: function(resJSon) {
                                var arrItem = resJSon.data;
                                arrItem.forEach(function(item) {
                                    $('#agent-ul').append('<li>' + item.agent_description + '</li>');
                                });
                            }
                        });
                        // dieu tri
                        $.ajax({
                            url: conf + '/api/treatment/getbysickid/' + Item.sick_id,
                            method: 'GET',
                            contentType: 'application/json; charset=utf-8',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Authorization': token
                            },
                            success: function(resJSon) {
                                var arrItem = resJSon.data;
                                arrItem.forEach(function(item) {
                                    $('#treatment-ul').append('<li>' + item.treatment_description + '</li>');
                                });
                            }
                        });
                    });
                    $('#listHistorySick').html(html);



                }
            });
        }
    });
    request.fail(function(jqXHR, textStatus) {
        console.log('Không lấy được danh sách material, nhấn F5 để tải lại trang');
    });
}


function printListMedicineBio(conf, token, userId) {
    var ajaxConfig = {
        url: conf + '/api/material/getbymaterialtype/3',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        if (rs.Error) {
            console.log('Không lấy được danh sách material, nhấn F5 để tải lại trang');
        } else {
            medicineBioArrayItem = rs.data; //
            var someJSONdata = [];
            $('#pagination-container-medicine-bio').pagination({
                dataSource: medicineBioArrayItem,
                pageSize: 3,
                callback: function(data, pagination) {
                    var html = '';
                    data.forEach(function(Item) {
                        someJSONdata.push({
                            'ID': Item.material_id,
                            'Số Lô': Item.material_numberOfLot,
                            'Loại Thuốc': ((Item.materialtype_id == 3) ? 'Chế Phẩm Sinh Học' : ''),
                            'Tên Thuốc': Item.material_name,
                            'Nguồn Gốc': Item.material_source,
                            'Số Lượng': Item.material_quantity,
                            'Còn Lại': Item.material_existence,
                            'Đơn Giá': Item.material_price,
                            'Hoá Đơn': Item.bill_id
                        });

                    });


                    printJS({
                        header: '<h3 >DANH SÁCH CHẾ PHẨM SINH HỌC</h3>',
                        font: 'TimesNewRoman',
                        font_size: '12pt',
                        modalMessage: 'Retrieving Document...',
                        printable: someJSONdata,
                        properties: [
                            'ID', 'Số Lô', 'Loại Thuốc', 'Tên Thuốc', 'Nguồn Gốc', 'Số Lượng', 'Còn Lại', 'Đơn Giá', 'Hoá Đơn'
                        ],
                        type: 'json',

                    });
                }
            });
        }
    });
    request.fail(function(jqXHR, textStatus) {
        console.log('Không lấy được danh sách material, nhấn F5 để tải lại trang');
    });

}

/* Hàm lấy dữ liệu ao cho thêm nhật kí*/
function getPondbyUserId(conf, token, userId, callback) {
    jQuery.ajax({
        url: conf + '/api/pond/getlistbyuser/' + userId,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Authorization': token
        },
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata) {
            callback(resultdata.data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("Lỗi ! Không thể tải dữ liệu của ao theo user id. Vui lòng tải lại trang");
        },
    });
}
/**
 */
function getStockingbyUserId(conf, token, userId, callback) {
    jQuery.ajax({
        url: conf + '/api/stocking/getall/',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Authorization': token
        },
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata) {
            callback(resultdata.data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("Lỗi ! Không thể tải dữ liệu của ao theo user id. Vui lòng tải lại trang");
        },
    });
}
/**
 * get year for nhat ki ao
 */
function getYear() {
    var d = new Date();
    var year = d.getFullYear();
    var html = '<option value="' + year + '">' + year + '</option>'
    $('#year').html(html)
}
//getbyuser/:user_id
/**
 *  lấy dữ liệu stockingtype
 */
function getStockingTypeByUserId(conf, token, userId, callback) {
    jQuery.ajax({
        url: conf + '/api/stockingtype/getall/',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Authorization': token
        },
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata) {
            callback(resultdata.data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("Lỗi ! Không thể tải dữ liệu của ao theo user id. Vui lòng tải lại trang");
        },
    });
}

function getStockingNameById(conf, token, userId, stokingtypeId, callback) {
    jQuery.ajax({
        url: conf + '/api/stockingtype/getbyid/' + stokingtypeId,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Authorization': token
        },
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata) {
            callback(resultdata.data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("Lỗi ! Không thể tải dữ liệu của ao theo user id. Vui lòng tải lại trang");
        },
    });
}

function getStockingSpecies(conf, token, userId, stockingpondId, callback) {
    jQuery.ajax({
        url: conf + '/api/stocking/getbyid/' + stockingpondId + '/',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Authorization': token
        },
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata) {
            callback(resultdata.data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("Lỗi ! Không thể tải dữ liệu của ao theo user id. Vui lòng tải lại trang");
        },
    });
}

function getPondSquare(conf, token, userId, pondId, callback) {
    jQuery.ajax({
        url: conf + '/api/pond/getbyid/' + pondId + '/',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Authorization': token
        },
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata) {
            callback(resultdata.data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            displayError("Lỗi ! Không thể tải dữ liệu của ao theo user id. Vui lòng tải lại trang");
        },
    });
}
// function getListDiary(conf,token,userId,userPhone){
//     var ajaxConfig = {
//         url: conf +'/api/diary/getall/',
//         method : 'GET',
//         contentType: 'application/json; charset=utf-8',
//         headers:{
//                 'Content-Type':'application/x-www-form-urlencoded',
//                 'Authorization': token
//         },
//         // data:{}
//     }
//     var request = $.ajax(ajaxConfig);
//     request.done(function(rs){
//         if(rs.Error){
//                 console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
//         }else{
//             ArrayItem = rs.data;//

//         }
//     });
//     request.fail(function(jqXHR, textStatus){
//             console.log('Không lấy được danh sách material, nhấn F5 để tải lại trang');
//     });   

// }

// function getDiaryForEdit(conf,token,userId,diaryId,callback){
//     jQuery.ajax({
// 		url : conf + '/api/diary/getbyid/'+diaryId+'/',
// 		type: 'GET',
// 		contentType: 'application/json; charset=utf-8',
// 		headers: {
// 			'Authorization': token
// 		},
// 		contentType: 'application/json; charset=utf-8',
// 		success: function(resultdata){
//             callback(resultdata.data);
// 		},
// 		error: function(jqXHR,textStatus,errorThrown){
// 			displayError("Lỗi ! Không thể tải dữ liệu của ao theo user id. Vui lòng tải lại trang");
// 		},
// 	});
// }

/**=====================================================================
 * hàm xem chi tiết nhật kí ao nuôi
 * getDiaryDetail
 * @param {*} conf 
 * @param {*} token 
 * @param {*} userId 
 * @param {*} diaryId 
 *=====================================================================*/
function getInitialDiaryDetail(conf, token, userId, diaryId) {
    getDataDiaryForDetail(conf, token, userId, diaryId, function(data) {
        var pondId = data.pond_id;
        var stockingId = data.stocking_id;
        var stockingtypeId = data.stockingtype_id;
        var speciesId = data.species_id;
        getDataDiaryInfo(conf, token, userId, diaryId)
        getDataPreparePond(conf, token, userId, diaryId, pondId, stockingtypeId)
        getDataStockingPond(conf, token, userId, diaryId, pondId, stockingId)
        getDataTrackerAugmented(conf, token, userId, diaryId, pondId, stockingId)
            //getDataManagerFeedAndMedicine(conf,token,userId,diaryId,pondId,stockingId)
        getDataDiaryTotalReport(conf, token, userId, diaryId, pondId, stockingId)

    });



}
/**
 * @name lấy dữ liệu nhật kí
 * @param {*} conf 
 * @param {*} token 
 * @param {*} userId 
 * @param {*} diaryId 
 * @param {*} callback 
 */
function getDataDiaryForDetail(conf, token, userId, diaryId, callback) {
    var ajaxConfig = {
        url: conf + '/api/diary/getbyid/' + diaryId,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        data = rs.data;
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            callback(data)
        }
    });
    request.fail(function(jqXHR, textStatus) {
        console.log('Không lấy được danh sách material, nhấn F5 để tải lại trang');
    });
}
/**
 * @name getDataDiaryInfo
 * @param {*} conf 
 * @param {*} token 
 * @param {*} userId 
 * @param {*} diaryId 
 */
function getDataDiaryInfo(conf, token, userId, diaryId) {
    getDataDiaryForDetail(conf, token, userId, diaryId, function(data) {
        var pond_el = '<span class="text1">' + data.pond_id + '</span>';
        var stocking_el = '<span class="text1">' + data.stocking_id + '</span>';
        var diary_year_el = '<span class="text1">' + data.diary_year + '</span>';
        var diary_farmname_el = '<span class="text1">' + data.diary_farmname + '</span>';
        var diary_address_el = '<span class="text1">' + data.diary_address + '</span>';
        var diary_phone_el = '<span class="text1">' + data.diary_phone + '</span>';
        var diary_square_el = '<span class="text1">' + data.diary_square + ' m<sup>2</sup></span>';
        var speciesId = data.species_id;
        var stockingtypeId = data.stockingtype_id;
        getDataSpeciesForDetail(conf, token, userId, speciesId, function(data) {
            var species_el = '<span class="text1">' + data.species_name + '</span>';
            $('#species_detail').html(species_el);
        });
        getDataStockingTypeForDetail(conf, token, userId, stockingtypeId, function(data) {
            var stockingtype_el = '<span class="text1">' + data.stockingtype_name + '</span>';
            $('#stockingtype_detail').html(stockingtype_el);
        })
        $('#pond_detail').html(pond_el);
        $('#stocking_detail').html(stocking_el);
        $('#diary_year_detail').html(diary_year_el);
        $('#diary_farmname_detail').html(diary_farmname_el);
        $('#diary_address_detail').html(diary_address_el);
        $('#diary_phone_detail').html(diary_phone_el);
        $('#diary_square_detail').html(diary_square_el);

    });

}
/**
 * @name getDataSpeciesForDetail
 * @param {*} conf 
 * @param {*} token 
 * @param {*} userId 
 * @param {*} speciesId 
 * @param {*} callback 
 */
function getDataSpeciesForDetail(conf, token, userId, speciesId, callback) {
    var ajaxConfig = {
        url: conf + '/api/species/getbyid/' + speciesId,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        var data = rs.data;
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            callback(data);
        }
    });
}
/**
 * @name getDataStockingTypeForDetail
 * @param {*} conf 
 * @param {*} token 
 * @param {*} userId 
 * @param {*} stockingtypeId 
 * @param {*} callback 
 */
function getDataStockingTypeForDetail(conf, token, userId, stockingtypeId, callback) {
    var ajaxConfig = {
        url: conf + '/api/stockingtype/getbyid/' + stockingtypeId,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        var data = rs.data;
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            callback(data);
        }
    });
}
/**
 * @name getDataPreparePond
 * @param {*} conf 
 * @param {*} token 
 * @param {*} userId 
 * @param {*} diaryId 
 * @param {*} pondId 
 * @param {*} stockingtypeId 
 */
function getDataPreparePond(conf, token, userId, diaryId, pondId, stockingtypeId) {
    var ajaxConfig = {
        url: conf + '/api/pondpreparation/getbystockingpond?stocking_id=58&pond_id=5',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            ArrayItem = rs.data; //
            // console.log(JSON.stringify(ArrayItem));
            ArrayItem.forEach(function(element) {
                var pondpreparation_dateStart_el = '<span class="text1">' + moment(element.pondpreparation_dateStart).format('DD-MM-YYYY'); + '</span>';
                var pondpreparation_soilPH_el = '<span class="text1">' + element.pondpreparation_soilPH + '</span>';
                var pondpreparation_capacityOfFan_el = '<span class="text1">' + element.pondpreparation_capacityOfFan + ' (W)</span>';
                var pondpreparation_quantityOfFan_el = '<span class="text1">' + element.pondpreparation_quantityOfFan + ' Cánh</span>';
                $('#pondpreparation_dateStart_detail').html(pondpreparation_dateStart_el);
                $('#pondpreparation_soilPH_detail').html(pondpreparation_soilPH_el);
                $('#pondpreparation_capacityOfFan_detail').html(pondpreparation_capacityOfFan_el);
                $('#pondpreparation_quantityOfFan_detail').html(pondpreparation_quantityOfFan_el);
                var pondpreparationId = element.pondpreparation_id;
                var landbgId = element.landbg_id;
                getDataMaterialPreparePondDetail(conf, token, userId, pondpreparationId);
                getDataLandBackgroundForDetail(conf, token, userId, landbgId, function(data) {
                    var landbg_detail_el = '<span class="text1">' + data.landbg_name + '</span>';
                    $('#landbg_detail').html(landbg_detail_el);
                })

            }, this);
        }
    });
    request.fail(function(jqXHR, textStatus) {
        console.log('Không lấy được danh sách material, nhấn F5 để tải lại trang');
    });
}
/**
 * @name getDataMaterialPreparePondDetail
 * @param {*} conf 
 * @param {*} token 
 * @param {*} userId 
 * @param {*} pondpreparationId 
 */
function getDataMaterialPreparePondDetail(conf, token, userId, pondpreparationId) {
    var ajaxConfig = {
        url: conf + '/api/materialpreparationdetail/getbypondpreparation/2',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            ArrayItem = rs.data; //
            var html = '';
            var stt = 1;
            ArrayItem.forEach(function(element) {
                html +=
                    '<tr>' +
                    '<td>' + stt++ + '</td>' +
                    '<td class="text-center"  id="tdMaterial' + element.material_id + '" >' + +'</td>' +
                    '<td class="text-center" >' + element.matepredetail_quantity + '</td>' +
                    '<td class="text-center" >' + moment(element.matepredetail_date).format('DD-MM-YYYY') + '</td>' +
                    '<td class="text-center" >' + element.matepredetail_note + '</td>' +
                    '</tr>';
                var materialId = element.material_id;
                getMaterialForDetail(conf, token, userId, materialId, function(data) {
                    $('#tdMaterial' + element.material_id).html(data.material_name);
                });

            }, this);
            $('#listMaterialPondPreparation').html(html);
        }
    });
}
/**
 * @name getMaterialForDetail
 * @param {*} conf 
 * @param {*} token 
 * @param {*} userId 
 * @param {*} materialId 
 * @param {*} callback 
 */
function getMaterialForDetail(conf, token, userId, materialId, callback) {
    var ajaxConfig = {
        url: conf + '/api/material/getbyid/' + materialId,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        var data = rs.data;
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            callback(data);
        }
    });
}
/**
 * @name getDataLandBackgroundForDetail
 */
function getDataLandBackgroundForDetail(conf, token, userId, landbgId, callback) {
    var ajaxConfig = {
        url: conf + '/api/landbackground/getbyid/' + landbgId,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        var data = rs.data;
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            callback(data);
        }
    });
}
/**
 * @name getDataStockingPond
 * @param {*} conf 
 * @param {*} token 
 * @param {*} userId 
 * @param {*} diaryId 
 * @param {*} pondId 
 * @param {*} stockingId 
 */
function getDataStockingPond(conf, token, userId, diaryId, pondId, stockingId) {
    var ajaxConfig = {
        url: conf + '/api/stockingpond/getdetail?stocking_id=' + stockingId + '&pond_id=' + pondId,
        // url: conf +'/api/stockingpond/getdetail?stocking_id=56&pond_id=5',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            ArrayItem = rs.data; //
            // console.log(JSON.stringify(ArrayItem));
            var seedId = ArrayItem.seed_id;
            var stockpond_PCR_el = '<p class="text1">' + ((ArrayItem.stockpond_PCR == true) ? 'Có' : 'Không') + '</p>';
            var stockpond_PCRresult_el = '<p class="text1">' + ArrayItem.stockpond_PCRresult + '</p>';
            var stockpond_quantityStock_el = '<p class="text1">' + ArrayItem.stockpond_quantityStock + '</p>';
            var stockpond_quantityStock_el = '<p class="text1">' + ArrayItem.stockpond_quantityStock + ' Con</p>';
            var stockpond_density_el = '<p class="text1">' + ArrayItem.stockpond_density + ' Con/m<sup>2</sup></p>';
            var stockpond_statusOfSeed_el = '<p class="text1">' + ((ArrayItem.stockpond_statusOfSeed == true) ? 'Có' : 'Không') + '</p>';
            var stockpond_method_el = '<p class="text1">' + ArrayItem.stockpond_method + '</p>';
            var stockpond_depth_el = '<p class="text1">' + ArrayItem.stockpond_depth + '</p>';
            var stockpond_clarity_el = '<p class="text1">' + ArrayItem.stockpond_clarity + '</p>';
            var stockpond_salinity_el = '<p class="text1">' + ArrayItem.stockpond_salinity + '</p>';
            var stockpond_DO_el = '<p class="text1">' + ArrayItem.stockpond_DO + '</p>';
            var stockpond_PHwater_el = '<p class="text1">' + ArrayItem.stockpond_PHwater + '</p>';
            var stockpond_tempAir_el = '<p class="text1">' + ArrayItem.stockpond_tempAir + '</p>';
            var stockpond_tempWater_el = '<p class="text1">' + ArrayItem.stockpond_tempWater + '</p>';
            $('#stockpond_PCR_detail').html(stockpond_PCR_el);
            $('#stockpond_PCRresult_detail').html(stockpond_PCRresult_el);
            $('#stockpond_quantityStock_datail').html(stockpond_quantityStock_el);
            $('#stockpond_density_detail').html(stockpond_density_el);
            $('#stockpond_statusOfSeed_detail').html(stockpond_statusOfSeed_el);
            $('#stockpond_method_detail').html(stockpond_method_el);
            $('#stockpond_depth_detail').html(stockpond_depth_el);
            $('#stockpond_clarity_detail').html(stockpond_clarity_el);
            $('#stockpond_salinity_detail').html(stockpond_salinity_el);
            $('#stockpond_DO_detail').html(stockpond_DO_el);
            $('#stockpond_PHwater_detail').html(stockpond_PHwater_el);
            $('#stockpond_tempAir_detail').html(stockpond_tempAir_el);
            $('#stockpond_tempWater_detail').html(stockpond_tempWater_el);
            getDataSeedForStockingPond(conf, token, userId, seedId, function(data) {
                var seed_source_el = '<p class="text1">' + data.seed_source + '</p>';
                var seed_price_el = '<p class="text1">' + data.seed_price + ' Đồng/con</p>';
                var seed_numberOfLot_el = '<p class="text1">' + data.seed_numberOfLot + '</p>';
                var seed_size_el = '<p class="text1">Bot ' + data.seed_size + '</p>';
                var seedqualityId = data.seedquality_id;
                getDataSeedQualityForDetail(conf, token, userId, seedqualityId, function(data) {
                    var seedquality_el = '<p class="text1">' + data.seedquality_name + '</p>';
                    $('#seedquality_detail').html(seedquality_el);
                });
                $('#seed_source_detail').html(seed_source_el);
                $('#seed_price_detail').html(seed_price_el);
                $('#seed_numberOfLot_detail').html(seed_numberOfLot_el);
                $('#seed_size_detail').html(seed_size_el);

            });
        }
    });
}
/**
 * @name getDataSeedForStockingPond
 * @param {*} conf 
 * @param {*} token 
 * @param {*} userId 
 * @param {*} seedId 
 * @param {*} callback 
 */
function getDataSeedForStockingPond(conf, token, userId, seedId, callback) {
    var ajaxConfig = {
        url: conf + '/api/seed/getbyid/' + seedId,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        var data = rs.data;
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            callback(data);
        }
    });
}
/**
 * @name getDataSeedQualityForDetail
 * @param {*} conf 
 * @param {*} token 
 * @param {*} userId 
 * @param {*} seedqualityId 
 * @param {*} callback 
 */
function getDataSeedQualityForDetail(conf, token, userId, seedqualityId, callback) {
    var ajaxConfig = {
        url: conf + '/api/seedQuality/getbyid/' + seedqualityId,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        var data = rs.data;
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            callback(data);
        }
    });
}

function getDataTrackerAugmented(conf, token, userId, diaryId, pondId, stockingId) {
    var ajaxConfig = {
        // url: conf +'/api/trackeraugmented/getbystockingpond?pond_id='+ pondId +'&stocking_id='+stockingId,
        url: conf + '/api/trackeraugmented/getbystockingpond?pond_id=5&stocking_id=56',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        var ArrayData = rs.data;
        var html = '';
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            ArrayData.forEach(function(element) {
                html +=
                    '<tr>' +
                    '<td class="text-center">' + element.trackeraugmented_number + '</td>' +
                    '<td class="text-center">' + moment(element.trackeraugmented_date).format('DD-MM-YYYY') + '</td>' +
                    '<td class="text-center">' + element.trackeraugmented_age + '</td>' +
                    '<td class="text-center">' + element.trackeraugmented_densityAvg + '</td>' +
                    '<td class="text-center">' + element.trackeraugmented_weightAvg + '</td>' +
                    '<td class="text-center">' + element.trackeraugmented_speedOfGrowth + '</td>' +
                    '<td class="text-center">' + element.tracker_augmented_survival + '</td>' +
                    '<td class="text-center">' + element.trackeraugmented_biomass + '</td>' +
                    '<td >' + element.trackeraugmented_note + '</td>' +
                    '</tr>';
            }, this);
            $('#listTrackerAgumented_detail').html(html);
        }
    });
}
// get data Tong ket hieu qua ao nuoi
function getDataDiaryTotalReport(conf, token, userId, diaryId, pondId, stockingId) {
    // dien tich ao
    getPondSquare(conf, token, userId, pondId, function(data) {
        var pondSquare_el = '<p class="text1">' + (data.pond_height * data.pond_width) + '</p>';
        $('#pondSquare_report').html(pondSquare_el)
    })
    getDataStockingPondForReport(conf, token, userId, diaryId, pondId, stockingId, function(data) {

        var stockpond_date_el = '<p class="text1">' + moment(data.stockpond_date).format('DD-MM-YYYY') + '</p>';
        var stockpond_quantityStock_el = '<p class="text1">' + data.stockpond_quantityStock + '</p>';
        $('#stocking_date_report').html(stockpond_date_el);
        $('#stocking_quantity_report').html(stockpond_quantityStock_el);
    })
    getDataHarvestDetailForReport(conf, token, userId, diaryId, pondId, stockingId, function(data) {
        //console.log(JSON.stringify(data));
        var arrayData = data;
        var html = '';
        var total_weight = 0;
        var total_all = 0;

        arrayData.forEach(function(element) {
            total_weight += element.harvedeta_weight;
            total_all += (element.harvedeta_weight * element.harvedeta_price);
            var index = arrayData.indexOf(element) + 1;
            // console.log(index);
            html +=
                '<tr>' +
                '<td class="text1 text-center" id="harvest_date_' + index + '"></td>' +
                '<td class="text1 text-center" id="prodtype_id_' + index + '">' + element.prodtype_id + '</td>' +
                '<td class="text1 text-center">' + element.harvedeta_weight + '</td>' +
                '<td class="text1 text-center">' + element.harvedeta_price + '</td>' +
                '<td class="text1 text-center">' + (element.harvedeta_weight * element.harvedeta_price) + '</td>' +
                '</tr>';
            var prodtypeId = element.prodtype_id;
            var harvestId = element.harvest_id;

            getDataHarvestForReport(conf, token, userId, harvestId, function(data) {
                var harvest_harvestDate_el = '<p>' + moment(data.harvest_harvestDate).format('DD-MM-YYYY') + '</p>';
                $('#harvest_date_' + index).html(harvest_harvestDate_el);
            });
            getDataProdTypeForReport(conf, token, userId, prodtypeId, function(data) {
                var prodtype_typeName_el = '<p>' + data.prodtype_typeName + '</p>';
                $('#prodtype_id_' + index).html(prodtype_typeName_el)
            });
        });
        $('#listHarvestDetailForReport').html(html);
        var total_weight_el = '<p class="text-center">' + total_weight + '</p>';
        var total_all_el = '<p class="text-center">' + total_all + '</p>';
        $('#total_weight').html(total_weight_el);
        $('#total_all').html(total_all_el);
    })
    getDataBillForReport(conf, token, userId, stockingId, function(data) {
        var arrayBill = data;
        // var newArrayCost = [];
        // var newdata;
        arrayBill.forEach(function(element) {
            var billId = element.bill_id;

            getDataOtherForReport(conf, token, userId, billId, function(data) {
                // newdata = data
                console.log(JSON.stringify(data))
                renderDataOther(data)
            });
            // var newArrayCost = $.merge(newdata);
            // console.log(JSON.stringify(newArrayCost))
        });

        // get other by bill id
        // danh sach cac chi phí
    });
    //  tổng số ngày nuôinuôi
    // var start = moment('2017-02-01');
    // var end =  moment('2017-01-02');
    // var numOfday = end.diff(start, "days");
    // console.log(numOfday);
    // lượng thức ăn toàn vụ
    // số lượng thu hoạch
    // hệ số FCR = lượng thức ăn toàn vụ / tổng sàn lượng
    //
}

function getDataStockingPondForReport(conf, token, userId, diaryId, pondId, stockingId, callback) {
    var ajaxConfig = {
        url: conf + '/api/stockingpond/getdetail?stocking_id=' + stockingId + '&pond_id=' + pondId,
        // url: conf +'/api/stockingpond/getdetail?stocking_id=56&pond_id=5',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            var StockingPonddata = rs.data; //
            callback(StockingPonddata);

        }
    });
}

function getDataHarvestDetailForReport(conf, token, userId, diaryId, pondId, stockingId, callback) {
    var ajaxConfig = {
        url: conf + '/api/harvestdetail/getlistbystockingandpond?stocking_id=' + stockingId + '&pond_id=' + pondId,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            var newdata = rs.data; //
            callback(newdata);

        }
    });
}

function getDataHarvestForReport(conf, token, userId, harvestId, callback) {
    var ajaxConfig = {
        url: conf + '/api/harvest/getbyid/' + harvestId,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            var newdata = rs.data; //
            callback(newdata);

        }
    });
}

function getDataProdTypeForReport(conf, token, userId, prodtypeId, callback) {
    var ajaxConfig = {
        url: conf + '/api/producttype/getbyid/' + prodtypeId,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            var newdata = rs.data; //
            callback(newdata);

        }
    });
}

function getDataBillForReport(conf, token, userId, stockingId, callback) {
    var ajaxConfig = {
        url: conf + '/api/bill/getbystocking/' + stockingId,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            var newdata = rs.data; //
            callback(newdata);

        }
    });
}

function getDataOtherForReport(conf, token, userId, billId, callback) {
    var ajaxConfig = {
        url: conf + '/api/other/getbybill/' + billId,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(rs) {
        if (rs.Error) {
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
        } else {
            var arrayDatas = rs.data; //
            callback(arrayDatas)
                //    renderDataOther(arrayDatas)
                //    var total_all = Number($('#total_all').text());
                //    $('#total_all_report').html('Tổng Doanh thu:  '+total_all);
                //    var total_cost = Number($('#total_cost_report').text());

            // //    alert(total_all +'-'+ total_cost);


            //    $('#total_earn_report').html( 'Lợi nhuận = Doanh thu - Tổng chi phí = ');
        }
    });
}
// render data ====================================
function renderDataOther(arrayData) {
    var html = '';
    var total_cost = 0;
    console.log(JSON.stringify(arrayData));
    // arrayPrice = [];
    arrayData.forEach(function(element) {
        html +=
            '<tr>' +
            '<td class="text-center">' + element.other_name + '</td>' +
            '<td class="text-center">' + element.other_quantity + '</td>' +
            '<td class="text-center">' + element.other_price + '</td>' +
            '</tr>';
        total_cost += element.other_price;
        // arrayPrice.push(element.other_price);
    });

    //    
    $('#listOtherCostForReport').append(html);
    $('#total_cost_report').html(total_cost);


}