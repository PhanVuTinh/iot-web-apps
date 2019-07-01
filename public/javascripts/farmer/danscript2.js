/**
 * @name Nhật Kí Nuôi Tôm
 * @author Son Thanh Dan
 * @description Phần mới thêm vào các hàm dùng cho nhật kí nuôi
 * @param {*} conf : địa chỉ api
 * @param {*} token : mã xác thực
 * @param {*} userId : id của người dùng ở đây farmer
 * @param {*} callback : được gọi lại để lấy dữ liệu trả về
 * cấu trúc tên các hàm 
 * getList..,init... hàm được gọi ở trang ejs
 * getAllData.. lấy danh sách dữ liệu
 * getData..ById lấy theo id
 * render.. các hàm đổ dữ liệu
 * 
 *  happy coding!
 * 
 **/
/* khai báo global object dùng để lưu data tính lợi nhuận */
var globalScope = {
    doanhthu: null,
    tongchiphi: null
}
/* Hàm lấy danh sách nhật kí */
function getListDiary(conf,token,userId,userPhone){
var ajaxConfig = {
    url: conf + '/api/stockingpond/getall/',
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    ArrayData = resultdata.data;
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        renderListDiary(conf,token,userId,userPhone,ArrayData)
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* @description hàm khởi tạo load trang xem chi tiết nhật kí
*/
function initDiaryDetail(conf,token,userId,pondId,stockingId){
    renderDiaryInfo(conf,token,userId,pondId,stockingId);
    getDataStockingById(conf,token,userId,stockingId,function(data){
        var stockingtypeId = data.stockingtype_id;
        var speciesId = data.species_id;
        renderPreparePond(conf,token,userId,pondId,stockingId);
    });
    renderStockingPond(conf,token,userId,pondId,stockingId);
    renderTrackerAugmented(conf,token,userId,pondId,stockingId);
    renderDiaryReport(conf,token,userId,pondId,stockingId);
    renderTrackerWaterData(conf,token,userId,pondId,stockingId)
}
/**
* @description hiển thi danh sách nhật kí
*/
function renderListDiary(conf,token,userId,userPhone,ArrayData){
$('#pagination-container-diary').pagination({
    dataSource: ArrayData,
    pageSize: 10,
    callback: function(data, pagination) {
        var html = '';
        var stt = 1;
        data.forEach(function(element){
            var pondId = element.pond_id;
            var stockingId = element.stocking_id;
            html +=
            '<tr class="tr">' +
                '<td class="text-center text1" >' + stt++ + '</td>' +
                '<td class="text-center text1" >' + element.pond_id + '</td>' +
                '<td class="text-center text1" >' + element.stocking_id + '</td>'+
                '<td class="text-center text1" id="td_tentrainuoi_'+ element.pond_id + stockingId +'"</td>' +
                '<td class="text-center text1" id="tdSpecies_'+ element.pond_id + stockingId +'"></td>' +
                '<td class="text-center text1" id="tdStockingtype_'+ element.pond_id + stockingId +'"></td>' +
                '<td class="text-center text1" id="td_dientich_'+ element.pond_id + stockingId +'"></td>' +
                '<td class="text-center text1" id="td_sdt_'+ element.pond_id + stockingId +'"></td>' +
                '<td class="text-center text1" id="td_diachi_'+ element.pond_id + stockingId +'"></td>' +
                '<td class="text-center text1"> '+
                '<div class="btn-group" role="group">'+
                '<a title="Cập nhật nhật kí" href="/quantrac/nongdan/nhatki/capnhat/'+ element.pond_id+ '/'+ element.stocking_id +'"><i class="fa fa-pencil-square-o fa-2x"></i></a>'+
                '<a title="Xem chi tiết nhật kí" style="margin-left: 5px" href="/quantrac/nongdan/nhatki/chitiet/'+ element.pond_id+ '/'+ element.stocking_id +'"><i class="fa fa-book fa-2x"></i></a>'+
                '</div>'+
                '</td>' +
            '</tr>';
            // lấy dữ liệu ao theo pond_id
            getDataPondById(conf,token,userId,pondId,function(data){
                $('#td_tentrainuoi_'+pondId+stockingId).html(data.pond_description);
                $('#td_dientich_'+pondId+stockingId).html((data.pond_width*data.pond_height));
                $('#td_sdt_'+pondId+stockingId).html(userPhone);
                $('#td_diachi_'+pondId+stockingId).html(data.pond_address);
            })
            // lấy dữ liệu vụ nuôi theo stocking_id
            getDataStockingById(conf,token,userId,stockingId,function(data){
                var stokingtypeId = data.stockingtype_id;
                var speciesId = data.species_id;
                // lấy dữ liệu hình thức nuôi theo stockingtype_id
                getDataStockingTypeById(conf,token,userId,stokingtypeId,function(data){
                    $('#tdSpecies_'+element.pond_id+stockingId).html(data.stockingtype_name)
                });
                getDataSpeciesById(conf,token,userId,speciesId,function(data){
                    $('#tdStockingtype_'+element.pond_id+stockingId).html(data.species_name)
                })
            })
        });
        $('#listDiary').html(html);
    }
});
}
/**
* @description hàm hiển thị thông tin chung của nhật kí
*/
function renderDiaryInfo(conf,token,userId,pondId,stockingId){
// hàm lấy năm của vụ nuôi
getYearNow(function(data){
    var diary_year_el = '<p class="text1">'+ data +'</p>';
    $('#diary_year_detail').html(diary_year_el);
})
// lấy dữ liệu ao theo pond_id
getDataPondById(conf,token,userId,pondId,function(data){
    var pond_el = '<p class="text1">'+ pondId +'</p>';
    var stockingtype_el = '<p class="text1">'+ stockingId +'</p>';
    var diary_square_el = '<p class="text1">'+ (data.pond_width*data.pond_height)+' m<sup>2</sup></p>';
    var diary_farmname_el = '<p class="text1">'+ data.pond_description +'</p>';
    // var diary_phone_el = '<p class="text1">0962010214</p>';
    var pond_address_el = '<p class="text1">'+ data.pond_address+ '</p>';
    $('#pond_detail').html(pond_el);
    $('#stocking_detail').html(stockingtype_el)
    $('#diary_address_detail').html(pond_address_el);
    // $('#diary_phone_detail').html(diary_phone_el);
    $('#diary_square_detail').html(diary_square_el);
    $('#diary_farmname_detail').html(diary_farmname_el);
})
// lấy dữ liệu vụ nuôi theo id
getDataStockingById(conf,token,userId,stockingId,function(data){
    var stokingtypeId = data.stockingtype_id;
    var speciesId = data.species_id;
    // lấy hình thức nuôi theo id
    getDataStockingTypeById(conf,token,userId,stokingtypeId,function(data){
        var stockingtype_name_el = '<p class="text1">'+ data.stockingtype_name +'</p>';
        $('#stockingtype_detail').html(stockingtype_name_el)
    });
    // lấy chủng loại theo id
    getDataSpeciesById(conf,token,userId,speciesId,function(data){
        var species_name_el = '<p class="text1">'+ data.species_name+'</p>';
        $('#species_detail').html(species_name_el)
    })
})

}
/**
* @description hàm đỗ dữ liệu tab chuẩn bị ao
*/
function renderPreparePond(conf,token,userId,pondId,stockingId){
//lấy dữ liệu chuẩn bị ao theo pond id va stocking id
getDataPreparePondByStockingIdPondId(conf,token,userId,pondId,stockingId,function(data){
     data.forEach(function(element) {
        var pondpreparation_dateStart_el = '<span class="text1">'+ moment(element.pondpreparation_dateStart).format('DD-MM-YYYY'); +'</span>';
        var pondpreparation_soilPH_el = '<span class="text1">'+ element.pondpreparation_soilPH +'</span>';
        var pondpreparation_capacityOfFan_el = '<span class="text1">'+ element.pondpreparation_capacityOfFan+' (W)</span>';
        var pondpreparation_quantityOfFan_el = '<span class="text1">'+ element.pondpreparation_quantityOfFan+' Cánh</span>';
        $('#pondpreparation_dateStart_detail').html(pondpreparation_dateStart_el);
        $('#pondpreparation_soilPH_detail').html(pondpreparation_soilPH_el);
        $('#pondpreparation_capacityOfFan_detail').html(pondpreparation_capacityOfFan_el);
        $('#pondpreparation_quantityOfFan_detail').html(pondpreparation_quantityOfFan_el);
        var pondpreparationId = element.pondpreparation_id;
        var landbgId = element.landbg_id;
        // lấy vật liệu chuẩn bi ao theo pondpreparationId
        getDataMaterialPreparationDetailById(conf,token,userId,pondpreparationId,function(data){
            var html = '';
            var stt = 1;
            data.forEach(function(element) {
                html += 
                    '<tr>' +
                        '<td class="text-center text1" >'+ stt++ +'</td>' +
                        '<td class="text-center text1"  id="tdMaterial'+ element.material_id +'" >'+   +'</td>' +
                        '<td class="text-center text1" >'+ element.matepredetail_quantity +'</td>' +
                        '<td class="text-center text1" >'+moment(element.matepredetail_date).format('DD-MM-YYYY') +'</td>' +
                        '<td class="text-center text1" >'+ element.matepredetail_note +'</td>' +
                    '</tr>' ;
                    var materialId = element.material_id;
                        // lấy vật liệu theo material id
                        getDataMaterialById(conf,token,userId,materialId,function(data){
                        $('#tdMaterial'+element.material_id).html(data.material_name);
                    });
            }, this);
            $('#listMaterialPondPreparation').html(html);
       });
       // lấy dữ liệu đất nền theo landbgId
        getDataLandBackgroundById(conf,token,userId,landbgId,function(data){
            var landbg_detail_el = '<span class="text1">'+ data.landbg_name +'</span>';
                 $('#landbg_detail').html(landbg_detail_el);
        });
    }, this);
})
}
/**
* @description hàm đỗ dữ liệu cho tab thả giống
*/
function renderStockingPond(conf,token,userId,pondId,stockingId){
// lấy dữ liệu thả giống theo pondId và stockingId
getDataStockingPondByStockingIdPondId(conf,token,userId,pondId,stockingId,function(data){
    var seedId = data.seed_id;
    var stockpond_PCR_el = '<p class="text1">'+ ((data.stockpond_PCR == true)? 'Có':'Không') +'</p>';
    var stockpond_PCRresult_el = '<p class="text1">'+ data.stockpond_PCRresult +'</p>';
    var stockpond_quantityStock_el = '<p class="text1">'+ data.stockpond_quantityStock +'</p>';
    var stockpond_quantityStock_el = '<p class="text1">'+ data.stockpond_quantityStock +' Con</p>';
    var stockpond_density_el = '<p class="text1">'+ data.stockpond_density +' Con/m<sup>2</sup></p>';
    var stockpond_statusOfSeed_el = '<p class="text1">'+ ((data.stockpond_statusOfSeed == true)? 'Có':'Không') +'</p>';
    var stockpond_method_el = '<p class="text1">'+data.stockpond_method + '</p>';
    var stockpond_depth_el = '<p class="text1">'+ data.stockpond_depth +'</p>';
    var stockpond_clarity_el = '<p class="text1">'+ data.stockpond_clarity +'</p>';
    var stockpond_salinity_el = '<p class="text1">'+ data.stockpond_salinity +'</p>';
    var stockpond_DO_el = '<p class="text1">'+ data.stockpond_DO +'</p>';
    var stockpond_PHwater_el = '<p class="text1">'+ data.stockpond_PHwater +'</p>';
    var stockpond_tempAir_el = '<p class="text1">'+ data.stockpond_tempAir +'</p>';
    var stockpond_tempWater_el = '<p class="text1">'+ data.stockpond_tempWater +'</p>';
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
    // lấy dữ liệu giống theo seed_id
    getDataSeedById(conf,token,userId,seedId,function(data){
         var seed_source_el = '<p class="text1">'+ data.seed_source +'</p>';
         var seed_price_el = '<p class="text1">'+  data.seed_price +' Đồng/con</p>';
         var seed_numberOfLot_el = '<p class="text1">'+ data.seed_numberOfLot+'</p>';
         var seed_size_el = '<p class="text1">Bot '+ data.seed_size +'</p>';
         var seedQualityId = data.seedquality_id;
         // lấy dữ liệu chất lượng giống theo seedQualityId
         getDataSeedQualityById(conf,token,userId,seedQualityId,function(data){
            var seedquality_el =  '<p class="text1">'+ data.seedquality_name +'</p>';
            $('#seedquality_detail').html(seedquality_el);
         });
         $('#seed_source_detail').html(seed_source_el);
         $('#seed_price_detail').html(seed_price_el);
         $('#seed_numberOfLot_detail').html(seed_numberOfLot_el);
         $('#seed_size_detail').html(seed_size_el);
       
    });
})
}
/**
* @description hàm đỗ dữ liệu cho tab theo dõi tăng trưởng
*/
function renderTrackerAugmented(conf,token,userId,pondId,stockingId){
// lấy dữ liệu theo dõi tăng trưởng theo pondId và stockingId
getDataTrackerAugmentedByPondIdStockingId(conf,token,userId,pondId,stockingId,function(ArrayData){
   var html = '';
    ArrayData.forEach(function(element) {
        html += 
             '<tr>'+
                 '<td class="text-center text1">'+ element.trackeraugmented_number +'</td>'+
                 '<td class="text-center text1">'+ moment(element.trackeraugmented_date).format('DD-MM-YYYY') +'</td>'+
                 '<td class="text-center text1">'+ element.trackeraugmented_age +'</td>'+
                 '<td class="text-center text1">'+ element.trackeraugmented_densityAvg +'</td>'+
                 '<td class="text-center text1">'+ element.trackeraugmented_weightAvg +'</td>'+
                 '<td class="text-center text1">'+ element.trackeraugmented_speedOfGrowth +'</td>'+
                 '<td class="text-center text1">'+ element.tracker_augmented_survival +'</td>'+
                 '<td class="text-center text1">'+ element.trackeraugmented_biomass +'</td>'+
                 '<td class="text1 ">'+ element.trackeraugmented_note +'</td>'+
             '</tr>';
    }, this);
    $('#listTrackerAgumented_detail').html(html);
})
}
/**
* @description hàm đổ dữ liệu cho tab tổng kết
*/
function renderDiaryReport(conf,token,userId,pondId,stockingId){
// lấy dữ liệu ao theo id
getDataPondById(conf,token,userId,pondId,function(data){
    var pondSquare_el = '<p class="text1">'+ (data.pond_height*data.pond_width) +' m<sup>2</sup></p>';
    $('#pondSquare_report').html(pondSquare_el)
})
// lấy dữ liệu thả giống theo pondId và stockingId
getDataStockingPondByStockingIdPondId(conf,token,userId,pondId,stockingId,function(data){
    var stockpond_date_el = '<p class="text1">'+ moment(data.stockpond_date).format('DD-MM-YYYY') +'</p>';
    var stockpond_quantityStock_el = '<p class="text1">'+ data.stockpond_quantityStock +' con</p>';
    $('#stocking_date_report').html(stockpond_date_el);
    $('#stocking_quantity_report').html(stockpond_quantityStock_el); 
})
// lấy dữ liệu thả giống theo pondId và stockingId
getDataHarvestDetailByPondIdStockingId(conf,token,userId,pondId,stockingId,function(data){
    var arrayData = data;
    var html ='';
    var total_weight = 0;
    var total_all = 0;
    var lastElement = arrayData[arrayData.length - 1];
    getDataHarvestById(conf,token,userId,lastElement.harvest_id,function(data){
        var harvest_harvestDate_el_last = '<p class="text1">'+ moment(data.harvest_harvestDate).format('DD-MM-YYYY') +'</p>';
        $('#harvest_date_last').html(harvest_harvestDate_el_last);
        // tong so ngay nuoi
        var fromDate = $('#stocking_date_report').text();
        var toDate = $('#harvest_date_last').text();
        from = moment(fromDate, 'DD-MM-YYYY'); 
        to = moment(toDate, 'DD-MM-YYYY'); 
        /* hàm diff trong mommentjs */
        duration = to.diff(from, 'days')
        //console.log(duration);
        var total_stockingdate_report_el = '<p class="text1">'+ duration +' Ngày</p>';
        $('#total_stockingdate_report').html(total_stockingdate_report_el)
    });
   
    arrayData.forEach(function(element){
        total_weight += element.harvedeta_weight;
        total_all += (element.harvedeta_weight * element.harvedeta_price);
        var index = arrayData.indexOf(element)+ 1;
        html += 
            '<tr>' +
                '<td class="text1 text-center">'+ element.harvedeta_number +'</td>' +
                '<td class="text1 text-center" id="harvest_date_'+ index +'"></td>' +
                '<td class="text1 text-center" id="prodtype_id_'+ index+ '">'+element.prodtype_id+'</td>' +
                '<td class="text1 text-center">'+ element.harvedeta_weight +'</td>' +
                '<td class="text1 text-center">'+ element.harvedeta_price +'</td>' +
                '<td class="text1 text-center">'+ (element.harvedeta_weight * element.harvedeta_price)+'</td>' +
            '</tr>';
        var prodtypeId = element.prodtype_id;
        var harvestId =  element.harvest_id;
        // lấy dữ liệu thu hoạch theo id 
        getDataHarvestById(conf,token,userId,harvestId,function(data){
            var harvest_harvestDate_el = '<p>'+ moment(data.harvest_harvestDate).format('DD-MM-YYYY') +'</p>';
            $('#harvest_date_'+index).html(harvest_harvestDate_el);
            
        });
        // lấy dữ liệu loại sản phẩm theo id
        getDataProductTypeById(conf,token,userId,prodtypeId,function(data){
            var prodtype_typeName_el = '<p>'+ data.prodtype_typeName +'</p>';
             $('#prodtype_id_'+ index).html(prodtype_typeName_el)
        });

    });
    $('#listHarvestDetailForReport').html(html);
    var total_weight_el ='<p class="text-center">'+ total_weight + '</p>';
    var total_all_el = '<p class="text-center">'+ total_all +'</p>';
    $('#total_weight').html(total_weight_el);
    $('#total_all').html(total_all_el);
    $('#harvest_weight_report').html(total_weight_el);
    $('#total_all_report').html(total_all_el)
    globalScope.doanhthu = total_all;
})
// lấy dữ liệu hoá đơn theo stockingId
getDataBillByStockingId(conf,token,userId,stockingId,function(data){
    var arrayBill = data;
    var totalAll = 0;
    arrayBill.forEach(function(element){
        var billId = element.bill_id;
        // lấy dữ liệu chi phí bảng other theo billId
        getDataOtherBybillId(conf,token,userId,billId,function(data){
            var arrayData = data;
            var html = '';
            var total_cost = 0;
            arrayData.forEach(function(element){
               html +=
                '<tr>'+
                    '<td class="text-center">'+ element.other_name +'</td>'+
                    '<td class="text-center">'+ element.other_quantity +'</td>'+
                    '<td class="text-center">'+ element.other_price +'</td>'+
                '</tr>';
                total_cost += element.other_price;
            });
            $('#listOtherCostForReport').append(html);
            $('#total_cost_report').html(total_cost);
           totalAll += total_cost;
           $('#total_cost_report').html(totalAll)
           // setTimeout theo tổng số phần tử* 1 mili giây
          setTimeout(function(){   
              globalScope.tongchiphi = totalAll; 
                var total_earn = (globalScope.doanhthu - globalScope.tongchiphi);
                $('#total_earn_report').html(total_earn);
            }, 1*arrayData.length);
        });        
    }); 
}); 
}

/**
* @description hàm đổ dữ liệu tab theo dõi chất lượng nước
*/
function renderTrackerWaterData(conf,token,userId,pondId,stockingId){
// lấy dữ liệu chất lượng nước mới nhất theo ao
getTopDataTrackerWaterByPondId(conf,token,userId,pondId,function(data){
    var html = '';
    data.forEach(function(element){
        var datatypeId = element.datatype_id;
        html+= 
            '<tr>'+
                '<td class="text-center text1 ">'+ moment(element.data_createdDate).format('hh:mm DD-MM-YYYY') +'</td>' +
                '<td class="text-center text1" id="datatype_'+ element.datatype_id +'"></td>' +
                '<td class="text-center text1 ">'+ element.data_value +'</td>' +
                '<td class="text-center text1 " id="datatype_unit'+ element.datatype_id +'"></td>' +
            '</tr>';
            getDataTypeById(conf,token,userId,datatypeId,function(data){
                var datatype_name_el = '<p>'+ data.datatype_name +'</p>';
                var datatype_unit_el = '<p>'+ data.datatype_unit +'</p>';
                $('#datatype_'+datatypeId).html(datatype_name_el)
                $('#datatype_unit'+datatypeId).html(datatype_unit_el)
            })
    })
    $('#listTopDataTrackerWater').html(html);
})
}
/**
* hàm lấy dữ liệu theo dõi chất lượng nước mới nhất theo ao
* trả về callback data
*/
function getTopDataTrackerWaterByPondId(conf,token,userId,pondId,callback){
var ajaxConfig = {
   // url: conf +'/api/data/gettopbypond/'+pondId,
    url: conf +'/api/data/gettopbypond/1',
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
    }else{
        callback(data)
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được danh sách material, nhấn F5 để tải lại trang');
});
}
/*
// hàm này chưa xong 
function renderManagerFeedAndMedicine(conf,token,userId,pondId,stockingId){
getDataBillByStockingId(conf,token,userId,stockingId,function(data){
    data.forEach(function(element){
        var billId = element.bill_id;
        getDataMaterialByBillId(conf,token,userId,billId,function(data2){
            data2.forEach(function(element2){
                console.log(JSON.stringify(element2))
                if(element2.materialtype_id == 2){
                    console.log('thuc an')
                } else if (element2.materialtype_id == 1){
                    console.log('thuoc')
                } 
            })
        })
    });
})
}
*/
/**
* hàm lấy vật liệu theo bill id
* trả về callback data
*/
function getDataMaterialByBillId(conf,token,userId,billId,callback){
var ajaxConfig = {
    url: conf +'/api/material/getbybill/'+billId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
    }else{
        callback(data)
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được danh sách material, nhấn F5 để tải lại trang');
});
}
/**
* hàm lấy loại dữ liệu theo id
* trả về callback data
*/
function getDataTypeById(conf,token,userId,datatypeId,callback){
var ajaxConfig = {
    url: conf +'/api/datatype/getbyid/'+datatypeId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
            console.log('Không lấy được danh sách , nhấn F5 để tải lại trang');
    }else{
        callback(data)
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được danh sách material, nhấn F5 để tải lại trang');
});
}

/** 
*  Hàm lấy năm hiện tại
*/
function getYearNow(callback){
var date = new Date();
var year = date.getFullYear();
// var html = '<option value="'+ year +'">'+ year+'</option>'
// $('#year').html(html)
callback(year);
}
/**
*  Hàm lấy dữ liệu tất cả các ao 
*/
function getAllDataPond(conf,token,userId,callback){
var ajaxConfig = {
        url: conf + '/api/pond/getlistbyuser/'+ userId,
        method : 'GET',
        contentType: 'application/json; charset=utf-8',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
var request = $.ajax(ajaxConfig);
    request.done(function(resultdata){
        data = resultdata.data;
        if(resultdata.Error){
            console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
        }else{
            callback(data);
        }
    });
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    });
}
/**
*  Hàm lấy dữ liệu tất cả vụ nuôi
*/
function getAllStocking(conf,token,userId,callback){
var ajaxConfig = {
        url: conf + '/api/stocking/getall/',
        method : 'GET',
        contentType: 'application/json; charset=utf-8',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
var request = $.ajax(ajaxConfig);
    request.done(function(resultdata){
        data = resultdata.data;
        if(resultdata.Error){
            console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
        }else{
            callback(data);
        }
    });
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    });
}
/**
*  Hàm lấy dữ liệu vụ nuôi theo id
*/
function getDataStockingById(conf,token,userId,stockingId,callback){
var ajaxConfig = {
        url: conf + '/api/stocking/getbyid/'+stockingId,
        method : 'GET',
        contentType: 'application/json; charset=utf-8',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
var request = $.ajax(ajaxConfig);
    request.done(function(resultdata){
        data = resultdata.data;
        if(resultdata.Error){
            console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
        }else{
            callback(data);
        }
    });
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    });
}
/**
*  Hàm lấy dữ liệu tất cả hình thức thả nuôi   
*/
function getAllDataStockingType(conf,token,userId,callback){
var ajaxConfig = {
        url: conf + '/api/stockingtype/getall/',
        method : 'GET',
        contentType: 'application/json; charset=utf-8',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
var request = $.ajax(ajaxConfig);
    request.done(function(resultdata){
        data = resultdata.data;
        if(resultdata.Error){
            console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
        }else{
            callback(data);
        }
    });
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    });
}
/**
*  Hàm lấy hình thức nuôi theo id
*/
function getDataStockingTypeById(conf,token,userId,stockingtypeId,callback){
var ajaxConfig = {
        url: conf + '/api/stockingtype/getbyid/'+stockingtypeId,
        method : 'GET',
        contentType: 'application/json; charset=utf-8',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
}
var request = $.ajax(ajaxConfig);
    request.done(function(resultdata){
        data = resultdata.data;
        if(resultdata.Error){
            console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
        }else{
            callback(data);
        }
    });
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    });
}
/**
*  Hàm lấy dữ liệu chủng loài thả nuôi
*  lấy theo stockingpondId
*/
function getDataSpeciesById(conf,token,userId,speciesId,callback){
var ajaxConfig = {
        url: conf + '/api/species/getbyid/'+speciesId,
        method : 'GET',
        contentType: 'application/json; charset=utf-8',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
}
var request = $.ajax(ajaxConfig);
    request.done(function(resultdata){
        data = resultdata.data;
        if(resultdata.Error){
            console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
        }else{
            callback(data);
        }
    });
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    });
}
/**
*  Hàm lấy dữ liệu ao theo id
*/
function getDataPondById(conf,token,userId,pondId,callback){
var ajaxConfig = {
    url: conf + '/api/pond/getbyid/'+pondId+'/',
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        callback(data);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
*  Hàm lấy dữ liệu chuẩn bị ao
*  lấy theo /getbystockingpond?stocking_id=58&pond_id=5'
*/
function getDataPreparePondByStockingIdPondId(conf,token,userId,pondId,stockingId,callback){
var ajaxConfig = {
    url: conf + '/api/pondpreparation/getbystockingpond?stocking_id='+ stockingId + '&pond_id=' + pondId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        callback(data);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
*  Hàm lấy vật liệu chi tiết chuẩn bị ao
*/
function getDataMaterialPreparationDetailById(conf,token,userId,pondpreparationId,callback){
var ajaxConfig = {
    url: conf + '/api/materialpreparationdetail/getbypondpreparation/'+pondpreparationId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        callback(data);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
*  Hàm lấy vật liệu theo id
*/
function getDataMaterialById(conf,token,userId,materialId,callback){
var ajaxConfig = {
    url: conf + '/api/material/getbyid/'+materialId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        callback(data);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
*  Hàm lấy đất nền theo id
*/
function getDataLandBackgroundById(conf,token,userId,landbgId,callback){
var ajaxConfig = {
    url: conf + '/api/landbackground/getbyid/'+landbgId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        callback(data);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* Hàm lấy dữ liệu chuẩn bị ao
* getdetail?stocking_id='+ stockingId +'&pond_id='+pondId,
*/
function getDataStockingPondByStockingIdPondId(conf,token,userId,pondId,stockingId,callback){
var ajaxConfig = {
    url: conf + '/api/stockingpond/getdetail?stocking_id='+ stockingId +'&pond_id='+pondId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        callback(data);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
*  Hàm lấy giống theo id
*/
function getDataSeedById(conf,token,userId,seedId,callback){
var ajaxConfig = {
    url: conf + '/api/seed/getbyid/'+seedId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        callback(data);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* Hàm lấy chất lượng giống theo id
*/
function getDataSeedQualityById(conf,token,userId,seedQualityId,callback){
var ajaxConfig = {
    url: conf + '/api/seedQuality/getbyid/'+seedQualityId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        callback(data);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* Hàm lấy dữ liệu theo dõi tăng trưởng
* trackeraugmented/getbystockingpond?pond_id=5&stocking_id=56'
*/
function getDataTrackerAugmentedByPondIdStockingId(conf,token,userId,pondId,stockingId,callback){
var ajaxConfig = {
    url: conf + '/api/trackeraugmented/getbystockingpond?pond_id=5&stocking_id=56',
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        callback(data);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* Hàm lấy chi tiết thu hoạch
* lấy theo pond id stocking id
*/
function getDataHarvestDetailByPondIdStockingId(conf,token,userId,pondId,stockingId,callback){
var ajaxConfig = {
    url: conf + '/api/harvestdetail/getlistbystockingandpond?stocking_id='+ stockingId +'&pond_id='+ pondId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        callback(data);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});    
}
/**
* hàm lấy thu hoạch theo id
*/
function getDataHarvestById(conf,token,userId,harvestId,callback){
var ajaxConfig = {
    url: conf + '/api/harvest/getbyid/'+harvestId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        callback(data);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* hàm lấy loại sản phẩm theo id
*/
function getDataProductTypeById(conf,token,userId,prodtypeId,callback){
var ajaxConfig = {
    url: conf + '/api/producttype/getbyid/'+prodtypeId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        callback(data);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* hàm lấy hoá đơn theo pond id
*/
function getDataBillByStockingId(conf,token,userId,stockingId,callback){
var ajaxConfig = {
    url: conf + '/api/bill/getbystocking/'+stockingId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        callback(data);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* Hàm lấy chi phí theo bill id
*/
function getDataOtherBybillId(conf,token,userId,billId,callback){
var ajaxConfig = {
    url: conf + '/api/other/getbybill/'+billId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        callback(data);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* ====================== KHỞI TẠO CẬP NHẬT NHẬT KÍ ========================
*/
function initialEditDetailDiary(conf,token,userId,pondId,stockingId){
   // renderOptionLandBackground(conf,token,userId)
    renderOptionSeed(conf,token,userId);
    renderOptionPond(pondId);
    renderOptionStocking(stockingId)
    // renderOptionSeedQuality(conf,token,userId);
    // renderOptionMaterialType(conf,token,userId);
    renderOptionUnit(conf,token,userId);
    renderOptionProdType(conf,token,userId);
     renderOptionMaterial(conf,token,userId);
    renderEditPondPreparation(conf,token,pondId,stockingId);
    renderEditStockingPond(conf,token,pondId,stockingId);
    renderEditTrackerAugmented(conf,token,pondId,stockingId);
    renderEditHarvestDetail(conf,token,pondId,stockingId);
    renderEditMaterialPreparation(conf,token,userId,pondId,stockingId);
   // renderEditHarvestDetail(conf,token,pondId,stockingId)
}
/**
* hàm tạo option dat nền
*/

function renderOptionLandBackground(conf,token,userId){
// getAllLandBackground(conf,token,userId,function(data){

// });
var ajaxConfig = {
    url: conf + '/api/landbackground/getall',
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    // var html = '';
    // if(resultdata.Error){
    //     console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    // }else{
    //     data.forEach(function(element){
    //         html += 
    //         '<option value="'+ element.landbg_id +'">'+ element.landbg_name +'</option>';
    //         // '<label class="radio-inline"><input type="radio" name="landbg_id" value="'+ element.landbg_id +'">'+ element.landbg_name +'</label>';
    //     });
    //     $('#landbg_id').html(html);
    //     $("#landbg_id").selectpicker('refresh');
    // }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* hàm tạo option tất cả giống
*/
function getAllSeed(conf,token,userId,callback){
var ajaxConfig = {
    url: conf + '/api/seed/getall',
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    var html = '';
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{     
        callback(data);
    }
});
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    });
}
function renderOptionSeed(conf,token,userId){
var ajaxConfig = {
    url: conf + '/api/seed/getall',
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    var html = '';
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        data.forEach(function(element){
            html += 
            '<option value="'+ element.seed_id +'">'+ element.seed_id +'</option>';
        });
        $('#seed_id2').html(html);
        $("#seed_id2").selectpicker("refresh");
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* hàm đổ dữ liệu pond id
*/
function renderOptionPond(pondId){
var html = '<option value="'+ pondId+'">'+ pondId +'</option>';
$('#pond_id2').html(html);
$("#pond_id2").selectpicker("refresh");
$('#pond_id3').html('<p class="text1">'+ pondId +'</>');
$('#pondIdforCBA').val(pondId);
}
/**
* hàm đỗ dữ liệu stocking id
*/
function renderOptionStocking(stockingId){
var html = '<option value="'+ stockingId+'">'+ stockingId +'</option>';
$('#stocking_id2').html(html);
$("#stocking_id2").selectpicker("refresh");
$('#stocking_id3').html('<p class="text1">'+ stockingId +'</>');
$('#stockingIdforCBA').val(stockingId);
}
/**
* hàm tạo option chất lượng giống
*/
function getAllSeedQuality(conf,token,userId,callback){
var ajaxConfig = {
    url: conf + '/api/seedquality/getall',
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    var html = '';
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{     
        callback(data);
    }
});
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    });
}
function renderOptionSeedQuality(conf,token,userId){
var ajaxConfig = {
    url: conf + '/api/seedquality/getall',
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    var html = '';
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        data.forEach(function(element){
            html += 
            '<option value="'+ element.seedquality_id +'">'+ element.seedquality_name +'</option>';
        });
        $('#seedquality_id2').html(html);
        $("#seedquality_id2").selectpicker("refresh");
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* hàm tạo option loại vật liệu
*/
function getAllMaterialType(conf,token,userId,callback){
var ajaxConfig = {
    url: conf + '/api/materialtype/getall',
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    var html = '';
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{     
        callback(data);
    }
});
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    });
}
function renderOptionMaterialType(conf,token,userId){
var ajaxConfig = {
    url: conf + '/api/materialtype/getall',
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    var html = '';
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        data.forEach(function(element){
            html += 
            '<option value="'+ element.materialtype_id +'">'+ element.materialtype_name +'</option>';
        });
        $('#materialtype_id2').html(html);
        $("#materialtype_id2").selectpicker("refresh");
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* hàm tạo option đơn vị
*/ 
function getAllUnit(conf,token,userId,callback){
var ajaxConfig = {
    url: conf + '/api/unit/getall',
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    var html = '';
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{     
        callback(data);
    }
});
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    });
}
function renderOptionUnit(conf,token,userId){
var ajaxConfig = {
    url: conf + '/api/unit/getall',
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    var html = '';
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        data.forEach(function(element){
            html += 
            '<option value="'+ element.unit_id +'">'+ element.unit_name +'</option>';
        });
        $('#unit_id2').html(html);
        $("#unit_id2").selectpicker("refresh");
        $('#unit_id3').html(html);
        $("#unit_id3").selectpicker("refresh");
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* hàm tạo option loại sản phẩm
*/
function getAllProdType(conf,token,userId,callback){
var ajaxConfig = {
    url: conf + '/api/producttype/getall',
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    var html = '';
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{     
        callback(data);
    }
});
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    });
}
function renderOptionProdType(conf,token,userId){
getAllProdType(conf,token,userId,function(data){
    var html = ''
    data.forEach(function(element){
        html += 
        '<option value="'+ element.prodtype_id +'">'+ element.prodtype_typeName +'</option>';
    });
    $('#prodtype_id2').html(html);
    $("#prodtype_id2").selectpicker("refresh");
})
        
}
/**
* hàm tạo option vật liệu
*/
function renderOptionMaterial(conf,token,userId){
var ajaxConfig = {
    url: conf + '/api/material/getall',
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    var html = '';
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        data.forEach(function(element){
            html += 
            '<option value="'+ element.material_id +'">'+ element.material_name +'</option>';
        });
        $('#material_id3').html(html);
        $("#material_id3").selectpicker("refresh");
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* hàm đổ dữ liệu cho cập nhật chuẩn bị ao
*/
function renderEditPondPreparation(conf,token,pondId,stockingId){
var ajaxConfig = {
    url: conf + '/api/pondpreparation/getbystockingpond?pond_id='+ pondId+'&stocking_id='+stockingId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    var html = '';
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        data.forEach(function(element){
            $('#pondpreparation_id').val(element.pondpreparation_id);
            $('#pond_id').val(element.pond_id);
            $('#stocking_id').val(element.stocking_id);
            $('#pondpreparation_soilPH_Edit').val(element.pondpreparation_soilPH);
            $('#pondpreparation_dateStart_Edit').val(moment(element.pondpreparation_dateStart).format('YYYY-MM-DD'));
            $('#pondpreparation_capacityOfFan_Edit').val(element.pondpreparation_capacityOfFan);
            $('#pondpreparation_quantityOfFan_Edit').val(element.pondpreparation_quantityOfFan);
           var landbg_selected = element.landbg_id;
           // getAllLandBackground(conf,token,callback)
            getAllLandBackground(conf,token,function(data2){
                var select = '';
                data2.forEach(function(items){
                    if(items.landbg_id == landbg_selected){
                      select += "<option selected value='"+items.landbg_id+"'>" + items.landbg_name+"</option>";
                    }
                    else{
                      select += "<option value='"+items.landbg_id+"'>" + items.landbg_name+"</option>";
                    }
                });
             
        
                $('#landbg_id_edit').html(select)
                $("#landbg_id_edit").selectpicker('refresh');
            })
        });
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* hàm đổ dữ liệu cho cập nhật thả giống
*/
function renderEditStockingPond(conf,token,pondId,stockingId){
var ajaxConfig = {
    url: conf + '/api/stockingpond/getdetail?pond_id='+ pondId +'&stocking_id='+stockingId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    var html = '';
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        // $('#stocking_id').val(data.stocking_id);
        // $('#pond_id').val(data.pond_id);
        //$('#stockpond_statusOfSeed').val(data.stockpond_statusOfSeed);
        //$('#stockpond_state').val(data.stockpond_state);
        if(data.stockpond_state == true){
            $('#stockpond_state').val(1);
        }else{
            $('#stockpond_state').val(0);
        }
        $('#stockpond_age').val(data.stockpond_age);
        $('#stockpond_date').val(moment(data.stockpond_date).format('YYYY-MM-DD'));
        if(data.stockpond_PCR == true){
            $('#stockpond_PCR').val(1);
        }else{
            $('#stockpond_PCR').val(0);
        }
        //$('#stockpond_PCR').val(data.stockpond_PCR);
        $('#stockpond_PCRresult').val(data.stockpond_PCRresult);
        $('#stockpond_quantityStock').val(data.stockpond_quantityStock);
        $('#stockpond_density').val(data.stockpond_density);
        if(data.stockpond_statusOfSeed == true){
            $('#stockpond_statusOfSeed').val(1);
        }else{
            $('#stockpond_statusOfSeed').val(0);
        }
        //$('#stockpond_statusOfSeed').val(data.stockpond_statusOfSeed);
        $('#stockpond_method').val(data.stockpond_method);
        // if(data.stockpond_method == true){
        //     $('#stockpond_method').val(1);
        // }else{
        //     $('#stockpond_method').val(0);
        // }
        $('#stockpond_depth').val(data.stockpond_depth);
        $('#stockpond_clarity').val(data.stockpond_clarity);
        $('#stockpond_salinity').val(data.stockpond_salinity);
        $('#stockpond_DO').val(data.stockpond_DO);
        $('#stockpond_PHwater').val(data.stockpond_PHwater);
        $('#stockpond_tempAir').val(data.stockpond_tempAir);
        $('#stockpond_tempWater').val(data.stockpond_tempWater);
        var seedId_selected = data.seed_id;
       // seed_id2
       getAllSeed(conf,token,userId,function(data){
        var select = '';
        data.forEach(function(items){
            if(items.seed_id == seedId_selected){
              select += "<option selected value='"+items.seed_id+"'>"+'Giống: '+ items.seed_id+' | Lô: '+ items.seed_numberOfLot+"</option>";
            }
            else{
              select += "<option value='"+items.seed_id+"'>"+'Giống:'+ items.seed_id+' | ' + items.seed_numberOfLot+"</option>";
            }
        });
        $('#seed_id2').html(select)
        $("#seed_id2").selectpicker('refresh');
       })
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}

/**
* hàm đổ dữ liệu cho cập nhật theo dõi tăng trưởng
*/
function renderEditTrackerAugmented(conf,token,pondId,stockingId){
$('#divEditTrackerAugmented').hide();
var ajaxConfig = {
    url: conf + '/api/trackeraugmented/getbystockingpond?pond_id='+ pondId +'&stocking_id='+stockingId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    var html = '';
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
      
        var html = '';
        data.forEach(function(element){
                html += 
                     '<tr>'+
                         '<td class="text-center text1">'+ element.trackeraugmented_number +'</td>'+
                         '<td class="text-center text1">'+ moment(element.trackeraugmented_date).format('DD-MM-YYYY') +'</td>'+
                         '<td class="text-center text1">'+ element.trackeraugmented_age +'</td>'+
                         '<td class="text-center text1">'+ element.trackeraugmented_densityAvg +'</td>'+
                         '<td class="text-center text1">'+ element.trackeraugmented_weightAvg +'</td>'+
                         '<td class="text-center text1">'+ element.trackeraugmented_speedOfGrowth +'</td>'+
                         '<td class="text-center text1">'+ element.tracker_augmented_survival +'</td>'+
                         '<td class="text-center text1">'+ element.trackeraugmented_biomass +'</td>'+
                         '<td class="text1 ">'+ element.trackeraugmented_note +'</td>'+
                         '<td class="text1 "> <a  href="/quantrac/nongdan/nhatki/capnhattangtruong/'+ element.trackeraugmented_id +'"><i class="fa fa-pencil-square-o fa-2x"></i></a> </td>'+
                     '</tr>';
        }, this);
        $('#listTrackerAgumented_Edit').html(html);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* hàm đỗ dữ liệu cập nhật theo dõi tăng trưởng theo id
*/ 
function renderEditTrackerAugmentedById(conf,token,trackeraugmentedId){
var ajaxConfig = {
    url: conf + '/api/trackeraugmented/getbyid/'+trackeraugmentedId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    var html = '';
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
       $('#trackeraugmented_id').val(data.trackeraugmented_id); 
       $('#pond_id').val(data.pond_id); 
       $('#stocking_id').val(data.stocking_id); 
       $('#trackeraugmented_date').val(data.trackeraugmented_date);
       $('#trackeraugmented_number').val(data.trackeraugmented_number);
       $('#trackeraugmented_age').val(data.trackeraugmented_age);
       $('#trackeraugmented_densityAvg').val(data.trackeraugmented_densityAvg);
       $('#trackeraugmented_weightAvg').val(data.trackeraugmented_weightAvg);
       $('#trackeraugmented_speedOfGrowth').val(data.trackeraugmented_speedOfGrowth);
       $('#tracker_augmented_survival').val(data.tracker_augmented_survival);
       $('#trackeraugmented_biomass').val(data.trackeraugmented_biomass);
       $('#trackeraugmented_note').val(data.trackeraugmented_note);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* hàm đỗ dữ liệu cập nhật thu hoạch
*/
function renderEditHarvestDetail(conf,token,pondId,stockingId){
var ajaxConfig = {
    url: conf + '/api/harvestdetail/getlistbystockingandpond?pond_id='+ pondId +'&stocking_id='+stockingId,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    var html = '';
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
        var html = '';
        data.forEach(function(element){
            var index = data.indexOf(element)+ 1;
                html += 
                     '<tr>'+ 
                         '<td class="text-center text1">'+ element.harvedeta_number +'</td>'+
                         '<td class="text-center text1" id="harvest_date_'+ index +'">'+ element.harvest_id +'</td>'+
                         '<td class="text-center text1" id="prodtype_id_'+ index+ '">'+ element.prodtype_id +'</td>'+
                         '<td class="text-center text1">'+ element.harvedeta_weight +'</td>'+
                         '<td class="text-center text1" id="unit_id_'+ index+ '">'+ element.unit_id +'</td>'+
                         '<td class="text-center text1 ">'+ element.harvedeta_price +'</td>'+
                         '<td class="text-center text1 ">'+ element.harvedeta_note +'</td>'+
                         '<td class="text-center text1 "> <a  href="/quantrac/nongdan/nhatki/capnhatthuhoach/'+ element.harvedeta_number+'/'+ element.harvest_id+ '/'+ element.prodtype_id +'"><i class="fa fa-pencil-square-o fa-2x"></i></a> </td>'+
                     '</tr>';
                     var prodtypeId = element.prodtype_id;
                     var harvestId =  element.harvest_id;
                     var unitId = element.unit_id;
                     // lấy dữ liệu thu hoạch theo id 
                     getDataHarvestById(conf,token,userId,harvestId,function(data){
                         var harvest_harvestDate_el = '<p>'+ moment(data.harvest_harvestDate).format('DD-MM-YYYY') +'</p>';
                         $('#harvest_date_'+index).html(harvest_harvestDate_el);
                         
                     });
                     // lấy dữ liệu loại sản phẩm theo id
                     getDataProductTypeById(conf,token,userId,prodtypeId,function(data){
                         var prodtype_typeName_el = '<p>'+ data.prodtype_typeName +'</p>';
                          $('#prodtype_id_'+ index).html(prodtype_typeName_el)
                     });
                     getDataUnitById(conf,token,unitId,function(data){
                        var unit_id_el = '<p>'+ data.unit_name +'</p>';
                        $('#unit_id_'+ index).html(unit_id_el)
                     })
            }, this);
            $('#listHarvestDetail_Edit2').html(html);
    }
});
request.fail(function(jqXHR, textStatus){
    console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
* hàm lấy dữ liệu đơn vị theo id
*/
function getDataUnitById(conf,token,unitId,callback){
    var ajaxConfig = {
        url: conf + '/api/unit/getbyid/'+unitId,
        method : 'GET',
        contentType: 'application/json; charset=utf-8',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(resultdata){
        data = resultdata.data;
        if(resultdata.Error){
            console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
        }else{
            callback(data);
        }
    });
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    });
}
/**
* hàm được gọi để đổ dữ liệu cho cập nhật thu hoạch theo chi tiết
*/
function renderEditHarvestDetailById(conf,token,userId,harvedetaNumber,harvestId,prodtypeId){
var ajaxConfig = {
    url: conf + '/api/harvestdetail/getdetail?harvest_id='+ harvestId +'&prodtype_id='+ prodtypeId +'&harvedeta_number='+harvedetaNumber,
    method : 'GET',
    contentType: 'application/json; charset=utf-8',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': token
    },
    // data:{}
}
var request = $.ajax(ajaxConfig);
request.done(function(resultdata){
    data = resultdata.data;
    if(resultdata.Error){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    }else{
       
        $('#harvedeta_weight').val(data.harvedeta_weight);
        // $('#unit_id').val();
        $('#harvedeta_price').val(data.harvedeta_price);
        $('#harvedeta_note').val(data.harvedeta_note);
        
        $('#harvedeta_number').val(data.harvedeta_number);
        $('#pond_id').val(data.pond_id);
        $('#prodtype_id_goc').val(data.prodtype_id);
        var prodtype_selected = data.prodtype_id;
        var unit_selected = data.unit_id;
       
        getAllProdType(conf,token,userId,function(data){
            var select = '';
            data.forEach(function(items){
                if(items.prodtype_id == prodtype_selected){
                  select += "<option selected value='"+items.prodtype_id+"'>" + items.prodtype_typeName+"</option>";
                }
                else{
                  select += "<option value='"+items.prodtype_id+"'>" + items.prodtype_typeName+"</option>";
                }
            });
            $('#prodtype_id2').html(select)
            $("#prodtype_id2").selectpicker('refresh');
        });
        getAllUnit(conf,token,userId,function(data){
            var select = '';
            data.forEach(function(items){
                if(items.unit_id == unit_selected){
                  select += "<option selected value='"+items.unit_id+"'>" + items.unit_name+"</option>";
                }
                else{
                  select += "<option value='"+items.unit_id+"'>" + items.unit_name+"</option>";
                }
            });
            $('#unit_id3').html(select)
            $("#unit_id3").selectpicker('refresh');
        })
        getDataHarvestById(conf,token,userId,harvestId,function(data){
            $('#harvest_harvestDate').val(data.harvest_harvestDate);
            $('#harvest_id').val(data.harvest_id);
            $('#user_id').val(data.user_id);
            $('#stocking_id').val(data.stocking_id);
        })
    } 
});
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
});
}
/**
 * hàm chỉnh sửa vật liệu chuần bị ao
 */
function renderEditMaterialPreparation(conf,token,userId,pondId,stockingId){
    var ajaxConfig = {
        url: conf + '/api/pondpreparation/getbystockingpond?stocking_id='+stockingId+'&pond_id='+pondId,
        method : 'GET',
        contentType: 'application/json; charset=utf-8',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
   
    var request = $.ajax(ajaxConfig);
    request.done(function(resultdata){
        data = resultdata.data;var html = '';
        if(resultdata.Error){
            console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
        }else{
            var pondpreparation_id;
          
            data.forEach(function(element){                
                pondpreparation_id = element.pondpreparation_id;
                getDataMaterialByPondpreparationId(conf,token,userId,pondpreparation_id,function(data){
                 console.log(JSON.stringify(data));
                 data.forEach(function(element){
                     html +=
                        '<tr>'+
                            '<td class="text-center">'+element.material_id  +'</td>'+
                            '<td class="text-center">'+element.matepredetail_quantity  +'</td>'+
                            '<td class="text-center">'+element.matepredetail_date  +'</td>'+
                            '<td class="text-center">'+element.matepredetail_note  +'</td>'+
                            '<td class="text-center"> <a  href="/quantrac/nongdan/nhatki/capnhatvatlieuchuanbiao/'+ element.pondpreparation_id +'/'+element.material_id +'"><i class="fa fa-pencil-square-o fa-2x"></i></a></td>'+
                        '</tr>';
                 });
                
            $('#listMaterialPondPreparation').html(html);
                });
            })
           
           
            
        }
    });
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    });
}
function getDataMaterialByPondpreparationId(conf,token,userId,PondpreparationId,callback){
    var ajaxConfig = {
        url: conf + '/api/materialpreparationdetail/getbypondpreparation/'+PondpreparationId,
        method : 'GET',
        contentType: 'application/json; charset=utf-8',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(resultdata){
        data = resultdata.data;
        if(resultdata.Error){
            console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
        }else{
            callback(data);
        }
    });
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    });
}
/**
 * hàm đỗ dữ liệu cập nhật vật liệu chuẩn bị ao
 */
function renderEditMaterialPreparationDetail(conf,token,userId,pondpreparationId,materialId){
    var ajaxConfig = {
        url: conf + '/api/materialpreparationdetail/getdetail?pondpreparation_id='+ pondpreparationId+'&material_id='+materialId,
        method : 'GET',
        contentType: 'application/json; charset=utf-8',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(resultdata){
        data = resultdata.data;
        if(resultdata.Error){
            console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
        }else{
            console.log(JSON.stringify(data))
            $('#pondpreparation_id').val(data.pondpreparation_id);
            $('#matepredetail_date').val(data.matepredetail_date);
            // $('#material_id').val(data.material_id);
            var selected_material_id =data.material_id;
            getAllMaterial(conf,token,userId,function(data2){
                var select = '';
                data2.forEach(function(items){
                    if(items.material_id == selected_material_id){
                      select += "<option selected value='"+items.material_id+"'>" + items.material_name+"</option>";
                    }
                    else{
                      select += "<option value='"+items.material_id+"'>" + items.material_name+"</option>";
                    }
                });
                $('#material_id').html(select)
                $("#material_id").selectpicker('refresh');
            })
            $('#matepredetail_quantity').val(data.matepredetail_quantity);
            $('#matepredetail_number').val(data.matepredetail_number);
            $('#matepredetail_note').val(data.matepredetail_note);
        }
    });
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    });
}
function getAllMaterial(conf,token,userId,callback){
    var ajaxConfig = {
        url: conf + '/api/material/getall',
        method : 'GET',
        contentType: 'application/json; charset=utf-8',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(resultdata){
        data = resultdata.data;
        if(resultdata.Error){
            console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
        }else{
            callback(data);
        }
    });
    request.fail(function(jqXHR, textStatus){
        console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
    });
}

/**
 * ham lay tat ca dat nen
 */
function getAllLandBackground(conf,token,callback){
    var ajaxConfig = {
        url: conf + '/api/landbackground/getall',
        method : 'GET',
        contentType: 'application/json; charset=utf-8',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': token
        },
        // data:{}
    }
    var request = $.ajax(ajaxConfig);
    request.done(function(resultdata){
        data = resultdata.data;
        var html = '';
        if(resultdata.Error){
            console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
        }else{     
            callback(data);
        }
    });
        request.fail(function(jqXHR, textStatus){
            console.log('Không lấy được dữ liệu , nhấn F5 để tải lại trang');
        });
    }