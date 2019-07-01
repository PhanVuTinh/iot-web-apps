/**
 * @function showTable
 * @event click
 * @description xử lý sự kiện khi người dùng nhấn nút sẽ ẩn hoặc hiển thị danh sách 
 * 
 */
function showTable(){
    var x = document.getElementById('myTable');
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function showTableData(){
    $("#dataHeader").hide();
    $("#myTableData").slideDown("slow");
    // load data

}
function closeTableData(){
    $("#myTableData").hide();
    $("#dataHeader").slideDown("slow");
}
/**
 * @name bản đồ trạm sông
 * @param conf,token,secu,map element,option
 * @description hiển thị trên bản đồ danh sách các trạm sông
 */
function initMapRiver(){
    var apiConf = window.conf;   // lấy conf
    var apiToken = window.token; // lấy token
    var apiSecu = window.secu;   // lấy secu
    var arrayLocation = [];      // tạo mảng các trạm
    var arrayRegionName = [];    // tạo mảng các vùng
    var divMap = document.getElementById('RiverMap'); 
    var mapCenter = new google.maps.LatLng(10.0451618,105.74685354);
    var mapOptions = { 
        zoom : 6,
        center: mapCenter
    };
    var RiverMap = new google.maps.Map(divMap,mapOptions);
    // Lấy dữ liệu từ service
    jQuery.ajax({
        url : apiConf+'/api/river/getall/',
        type: 'GET',
        headers: {'Authorization': apiSecu + apiToken},
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata){
       console.log('map data success');
            resultdata.data.forEach(function(items){
               // console.log(JSON.stringify(items));
                arrayLocation.push({
                    lat: items.river_latitude,
                    lng: items.river_longitude,
                    title: items.river_name,
                    label: items.river_id,
                    regionId: items.region_id,
                }); // push
            });
            var image = {
                        url: '/images/beachflag.png',
                        size: new google.maps.Size(20, 32),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(0, 32)
                        };
            var markers = arrayLocation.map(
                (location,i) => {
                    return new google.maps.Marker({
                        position: location,
                        label: location.label.toString(),
                        title: location.title,
                        icon: image,
                    }); // tạo Marker mới
                }
            ); // markers
            var markerCluster = new MarkerClusterer(RiverMap,markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
            ); // marker cluster
            
            markers.forEach(function(marker){
               // console.log(marker.label);
                var riverId = marker.label;
             
                google.maps.event.addListener(marker, 'click', function () {
                    // ajax
                   
                    jQuery.ajax({
                        url: apiConf+'/api/river/getbyid/'+riverId ,
                        type: 'GET',
                        headers: {'Authorization': apiSecu + apiToken},
                        contentType: 'application/json; charset=utf-8',
                        success: function(item){
                            console.log('river: '+ item.data.river_id);
                            function getRegion(){
                                var tmp;
                                jQuery.ajax({
                                    url: apiConf+'/api/region/getbyid/'+item.data.region_id,
                                    type: 'GET',
                                    headers: {'Authorization': apiSecu + apiToken},
                                    contentType: 'application/json; charset=utf-8',
                                    success: function(item){
                                        tmp = item.data
                                    },
                                    async: false
                                });
                               // console.log('region: '+ JSON.stringify(tmp));
                               return tmp; 
                           }
                      
                            html = '';
                            html += '<div id="dataHeader" >'
                            html += '<h4><image src="/images/Disqus.svg" id="icon-hoatdong" /><b>'+ item.data.river_name.toUpperCase() +'</b></h4>'
                            html += '<h5><b><i class="fa fa-bar-chart fa-1x" ></i>  TRẠM SỐ :</b>  '+ item.data.river_id+ '  |  '+ '<b>Thuộc:  </b>'+  getRegion().region_name +'</h5>'
                            html += '<h5><b><i class="fa fa-map fa-1x" ></i>  ĐỊA CHỈ TRẠM :</b> <i>'+ (( item.data.river_name)?  item.data.river_name : 'Trạm Test chưa đặt tên' ) +', xã Phú Thuận, H. Thoại Sơn, An Giang</i></h5>'
                            html += '<h5><b><i class="fa fa-globe fa-1x" ></i>  TOẠ ĐỘ :</b> '+  item.data.river_location +'</h5>'
                            html += '<h5><a onclick="showTableData()" class="btn btn-default" style="background-color: #fff;border-width: 2px;border-color: #FF4B00">Xem Dữ Liệu </a></h5>' 
                            html += '</div>'
                            html += '<div id="myTableData" aling="center" >'
                            html += '<h4>'+ item.data.river_name.toUpperCase() +'</h4>'
                            // html += '<hr>';
                            html += '<table style="border: 1px ; width: 400px;">'
                            html += '<tr>'
                            html += '    <th width="40%" height="30px">pH</th>'
                            html += '    <th width="50%" height="30px">2 mg/l</th>'
                            html += '    <th width="40%" height="30px">20/10/2017</th>'
                            html += '</tr>'
                          
                            html += '</table>'
                            html += '<hr>'
                            html += '<a onclick="closeTableData()" class="btn btn-default pull-right" style="background-color: #fff;"><i class="fa fa-close fa-1x"></i> Đóng</a>'
                            html += '</div>';
                            var infowindow = new google.maps.InfoWindow({
                                content: html
                            });
                            //infowindow.setContent(html);
                            infowindow.open(RiverMap, marker);
                        },
                        error: function(e){console.log(e)}
                    }); // ajax
                }); // map event
            }); // foreach     
        }, //success
        error: function(e){console.log(e+ 'khong the load data river map')}
    }); //ajax 
   
} // init map
