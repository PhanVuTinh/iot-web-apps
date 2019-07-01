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
 * @name bản đồ trạm điều hành
 * @param conf,token,secu,map element,option
 * @description hiển thị trên bản đồ danh sách các trạm điều hành
 */
function initMapSink(){
    var apiConf = window.conf;
    var apiToken = window.token;
    var apiSecu = window.secu;
    var arrayLocation = [];
    var arrayRegionName = [];
    var divMapSink = document.getElementById('SinkMap');
    var mapCenter = new google.maps.LatLng(10.0451618,105.74685350000004);
    var mapOptions = { 
        zoom : 6,
        center: mapCenter
    };
    var SinkMap = new google.maps.Map(divMapSink,mapOptions);
    // Lấy dữ liệu
    jQuery.ajax({
        url : apiConf+'/api/sink/getall/',
        type: 'GET',
        headers: {'Authorization': apiSecu + apiToken},
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata){
        console.log('map data success');
            resultdata.data.forEach(function(items){
                // console.log(items.station_latitude);
                arrayLocation.push({
                    lat: items.sink_latitude,
                    lng: items.sink_longitude,
                    title: items.sink_name,
                    label: items.sink_id,
                }); // push
            });
     
            var image = {
                        url: '/images/database.png',
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
            var markerCluster = new MarkerClusterer(SinkMap,markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
            ); // marker cluster
            
            markers.forEach(function(marker){
               // console.log(marker.label);
                var sinkId = marker.label;
                google.maps.event.addListener(marker, 'click', function () {
                    // ajax
                    jQuery.ajax({
                        url: apiConf+'/api/sink/getbyid/'+sinkId ,
                        type: 'GET',
                        headers: {'Authorization': apiSecu + apiToken},
                        contentType: 'application/json; charset=utf-8',
                        success: function(item){
                            console.log('station: '+ item.data.sink_id);
                            html = '';
                            html += '<div>'
                            html += '<h4><image src="/images/Disqus.svg" id="icon-hoatdong" /><b>'+  item.data.sink_name.toUpperCase() +'</b></h4>';
                            html += '<h5><b>Trạm  : </b>'+ item.data.sink_id +' </h5>';
                            html += '<h5><b>Địa chỉ trạm :</b> <i>'+ ((item.data.sink_address)? item.data.sink_address: 'Trạm Test Chưa có địa chỉ') +', xã Phú Thuận, H. Thoại Sơn, An Giang</i></h5>';
                            html += ' <h5><b>Toạ Độ : </b>'+  item.data.sink_location +'</h5>'
                            html += '</div>';
                            var infowindow = new google.maps.InfoWindow({
                                content: html
                            });
                            //infowindow.setContent(html);
                            infowindow.open(SinkMap, marker);
                        },
                        error: function(e){console.log(e)} 
                    }); // ajax
                }); // map event
            }); // foreach    
        }, //success
        error: function(e){console.log(e+ 'khong the load data sink map')}
    }); //ajax    
} // init map
