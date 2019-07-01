/** 
 * @name bản đồ quản lí ao
 * @param conf,token,secu,map element,option
 * @description hiển thị trên bản đồ danh sách ao nuôi tôm
 */
function initMapPond(){
    var apiConf = window.conf;
    var apiToken = window.token;
     var apiSecu = window.secu;
    var arrayLocation = [];
    var arrayRegionName = [];
    var divMapPond = document.getElementById('PondMap');
    var mapCenter = new google.maps.LatLng(10.0451618,105.74685354);
    var mapOptions = { 
        zoom : 8,
        center: mapCenter
    };
    var PondMap = new google.maps.Map(divMapPond,mapOptions);
    // Lấy dữ liệu
    jQuery.ajax({
        url : apiConf+'/api/pond/getall/',
        type: 'GET',
        headers: {'Authorization': apiToken},
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata){
        console.log('map data success');
            resultdata.data.forEach(function(items){
                // console.log(items.station_latitude);
                arrayLocation.push({
                    lat: items.pond_latitude,
                    lng: items.pond_longitude,
                    title: items.pond_description,
                    label: items.pond_id,
                }); // push
            });
     
            var image = {
                        url: '/images/cube.png',
                        size: new google.maps.Size(32, 32),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(0,32)
                        };
            var markers = arrayLocation.map(
                (location,i) => {
                    return new google.maps.Marker({
                        position: location,
                        label: location.label.toString(),
                        title: location.title,
                        icon: image,
                    }); // Marker
                }
            ); // markers
            var markerCluster = new MarkerClusterer(PondMap,markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
            ); // marker cluster
            
            markers.forEach(function(marker){
               // console.log(marker.label);
                var pondId = marker.label;
                google.maps.event.addListener(marker, 'click', function () {
                    // ajax
                    jQuery.ajax({
                        url: apiConf+'/api/pond/getbyid/'+pondId ,
                        type: 'GET',
                        headers: {'Authorization': apiToken},
                        contentType: 'application/json; charset=utf-8',
                        success: function(item){
                           // console.log('pond: '+ item.data.pond_id);
                            html = '';
                            html += '<div id="dataPondContainer" class="hidediv">'
                            html += '<table border="0" class="table  table-hover"><thead><tr>'
                            html += '<th>Ngày kiểm tra</th>'
                            html += '<th>Thông số đo</th>'
                            html += '<th>Giá trị</th>'
                            html += '<th>Đơn vị</th>'
                            html += '</tr></thead><tbody id="dataPond"></tbody></table>'
                            html += '</div>'
                            html += '<div class="col-sm-12" id="mapPondContainer">'
                            html += '<table><tbody><tr>'
                            html += '<td>'
                            html += '<div style="float:left">'
                            html += '<h4><image src="/images/Disqus.svg" id="icon-hoatdong" />ID: <b>  '+ item.data.pond_id +' | '+ item.data.pond_description.toUpperCase() +'</b></h4>';
                            html += '<h5><b>Chiều dài ao  : </b>'+ item.data.pond_height +' m </h5>';
                            html += '<h5><b>Chiều rộng ao  : </b>'+ item.data.pond_width +' m </h5>';
                            html += '<h5><b>Độ sâu  : </b>'+ item.data.pond_depth +' m </h5>';
                            html += ' <h5><b>Toạ Độ : </b>'+  item.data.pond_location +'</h5>'
                            html += '<h5><b>Địa chỉ :</b> <i>'+ ((item.data.pond_address)? item.data.pond_address: 'Trạm Test Chưa có địa chỉ') + '</i></h5>';
                            html += '<div>'
                            html += '</td>'
                            html += '<td>'
                            html += '<div id="weather-id" style="float:right"></div>'
                            html += '</td>'
                            html += '</tr></tbody></table>'
                            html += '<button onclick="xemdulieu('+item.data.pond_id +')" class="btn btn-primary">Xem du lieu</button>'
                            html += '</div>';

                            var infowindow = new google.maps.InfoWindow({
                                content: html
                            });
                            jQuery.getJSON( 'http://api.openweathermap.org/data/2.5/weather?units=metric&lat='+ item.data.pond_latitude +'&lon='+ item.data.pond_longitude +'&APPID=a350b6779c45f7511eb94ec4da17f41f&callback=?', function(data) {
                                //console.log(JSON.stringify(data));
                                html = '';
                                html += "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>";
                               // html += '<h5><b>Thoi : </b>'+ data.weather[0].main +' </h5>';
                                html += '<h5><b>Nhiệt độ : </b>'+ data.main.temp +'<sup>o</sup>C| | Độ ẩm: '+ data.main.humidity +'% </h5>';
                               // html += '<h5><b>min : </b>'+ data.main.temp_min+ '| max: ' +  data.main.temp_max+' </h5>';
                                // html += '<h5><b>sea_level : </b>'+ data.main.sea_level +' </h5>';
                                // html += '<h5><b>grnd_level : </b>'+ data.main.grnd_level +' </h5>';
                                $('#weather-id').html(html);
                              });
                            //infowindow.setContent(html);
                            infowindow.open(PondMap, marker);
                        },
                        error: function(e){console.log(e)} 
                    }); // ajax
                }); // map event
            }); // foreach    
        }, //success
        error: function(e){console.log(e+ 'khong the load data sink map')}
    }); //ajax    
} // init map

function xemdulieu(pondId){
    $('#mapPondContainer').hide();
    jQuery.ajax({
        // url: apiConf+'/api/data/gettopbypond/'+pondId,
         url: window.conf+'/api/data/gettopbypond/'+pondId,
        // url: 'http://localhost:3000/api/data/gettopbypond/1',
         type: 'GET',
         headers: {'Authorization': window.token},
         contentType: 'application/json; charset=utf-8',
         success: function(dataPond){
             html = '';
             console.log(dataPond)
             var arrayData = dataPond.data;
             arrayData.forEach(function(element){
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
                     }) // hàm này trong danscript.js
             });
             $('#dataPond').html(html);
         },
         error: function(e){console.log(e)} 
     });    
    $('#dataPondContainer').show();
  }
