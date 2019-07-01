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
/**
 * @name bản đồ trạm dữ liệu
 * @param conf,token,secu,map element,option
 * @description hiển thị trên bản đồ danh sách các trạm dữ liệu
 */
function initMapStation(){
    var apiConf = window.conf;
    var apiToken = window.token;
    var apiSecu = window.secu;
    var arrayLocation = [];
    var arrayRegionName = [];
    var divMapStation = document.getElementById('StationMap');
    var mapCenter = new google.maps.LatLng(10.0451618,105.74685350000004);
    var mapOptions = { 
        zoom : 6,
        center: mapCenter
    };
    var StationMap = new google.maps.Map(divMapStation,mapOptions);
    // Lấy dữ liệu
    jQuery.ajax({
        url : apiConf+'/api/station/getall/',
        type: 'GET',
        headers: {'Authorization': apiSecu + apiToken},
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata){
        console.log('map data success');
            resultdata.data.forEach(function(items){
                // console.log(items.station_latitude);
                arrayLocation.push({
                    lat: items.station_latitude,
                    lng: items.station_longitude,
                    title: items.station_name,
                    label: items.station_id,
                }); // push
            });
     
            var image = {
                        url: '/images/river.png',
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
            var markerCluster = new MarkerClusterer(StationMap,markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
            ); // marker cluster
            
            markers.forEach(function(marker){
               // console.log(marker.label);
                var stationId = marker.label;
                google.maps.event.addListener(marker, 'click', function () {
                    // ajax
                    jQuery.ajax({
                        url: apiConf+'/api/station/getbyid/'+stationId ,
                        type: 'GET',
                        headers: {'Authorization': apiSecu + apiToken},
                        contentType: 'application/json; charset=utf-8',
                        success: function(item){
                            console.log('station: '+ item.data.station_id);
                            html = '';
                            html += '<div>'
                            html += '<h4><image src="/images/Disqus.svg" id="icon-hoatdong" /><b>'+  item.data.station_name.toUpperCase() +'</b></h4>';
                            html += '<h5><b>Trạm  : </b>'+ item.data.station_id +' </h5>';
                            html += '<h5><b>Địa chỉ trạm :</b> <i>'+ ((item.data.station_address)? item.data.station_address: 'Trạm Test Chưa có địa chỉ') +', xã Phú Thuận, H. Thoại Sơn, An Giang</i></h5>';
                            html += ' <h5><b>Toạ Độ : </b>'+  item.data.station_location +'</h5>'
                            html += '</div>';
                            var infowindow = new google.maps.InfoWindow({
                                content: html
                            });
                            //infowindow.setContent(html);
                            infowindow.open(StationMap, marker);
                        },
                        error: function(e){console.log(e)} 
                    }); // ajax
                }); // map event
            }); // foreach    
        }, //success
        error: function(e){console.log(e+ 'khong the load data station map')}
    }); //ajax    
} // init map
