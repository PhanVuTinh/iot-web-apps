/**
 * Google Map
 * 
 */
// list data location

// create initial map
function initMap(){
    var locations = [
        {lat: 9.611582210984686, lng: 106.00982666015625 },
        {lat: 10.062163647896979, lng: 105.72589874267578 },
        {lat: 10.041204362388878, lng: 105.78838348388672 },
        {lat: 10.132468717070843, lng: 105.37158966064453   },
        {lat: 10.699743495305817, lng: 105.13023376464844 },
        {lat: 10.387870023379497, lng: 105.39253234863281 },
        {lat: 10.826561825487897, lng: 105.21675109863281 },
        {lat: 9.686721575790171, lng: 106.56309127807617 },
        {lat: 9.592625495833742, lng: 105.95077514648438 },
        {lat: 9.267490076221147, lng: 105.72006225585938 },
        {lat: 9.134639221716785, lng: 105.18722534179688 },
        {lat: 10.012129557908143, lng: 105.12680053710938 },
        {lat: 10.374361908438, lng: 104.57199096679688 },
        {lat: 10.244654445228337, lng: 104.02816772460938 },
        {lat: 9.933682229573083, lng: 106.46713256835938 },
        {lat: 10.233843084608255, lng: 106.38198852539062 },
        {lat: 9.56283423106296, lng: 106.40945434570312 },
        {lat: 9.776731270141317, lng: 104.93179321289062 },
        {lat: 9.373192635083443, lng: 104.87136840820312 },
        {lat: 9.026152779146141, lng: 104.84939575195312 },
        {lat: 8.806368159416285, lng: 104.83291625976562 },
        {lat: 8.692354112924871, lng: 106.62094116210938 },
        {lat: 8.431620998188286, lng: 104.84390258789062 }
    ];
    var map = new google.maps.Map(document.getElementById('mapvung'),
    // options
    {
        zoom : 6,
        center: { lat: 10.0451618 ,lng: 105.74685350000004 }
    });
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var image = {
      url: '/images/beachflag.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };

    // add array markers
    var markers = locations.map(
        (location,i) => {
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length],
                title: 'TRẠM QUAN TRẮC',
                icon: image
               
            });
        });
    var markerCluster = new MarkerClusterer(map,markers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
    );
  
    var infowindow = null;
    html = '';
    html += '<div>'
    html += '<h4><image src="/images/Disqus.svg" id="icon-hoatdong" /><b>TRẠM ĐẦU NGUỒN KÊNH BO</b></h4>';
    html += '<h5><b>Kiểu | Vùng : </b>Trạm Dữ Liệu | Vùng Phú Hòa</h5>';
    html += '<h5><b>Địa chỉ trạm :</b> <i>Đầu nguồn kênh Bo, xã Phú Thuận, H. Thoại Sơn, An Giang (Nhà anh Sáu Thạnh)</i></h5>';
    html += ''
    html += '</div>';
  

    infowindow = new google.maps.InfoWindow({
    content: html
    });

    // loop add markers
    for (var i = 0; i < markers.length; i++) {
        var marker = markers[i];
        google.maps.event.addListener(marker, 'click', function () {
    
        //infowindow.setContent(this.html);
        infowindow.open(map, this);
       });
    }
    // draw polygon
    var mypolygonCoords = [
        {lat: 10.033618963659704,lng: 105.76708674430847 },
        {lat: 10.02954094604865,lng: 105.76270937919617 },
        {lat: 10.024807845701602,lng: 105.76749444007874 },
        {lat: 10.030217097596955,lng: 105.77217221260071 },
        {lat: 10.031315840852868,lng: 105.76762318611145},
        {lat: 10.032351191664025,lng: 105.76985478401184 },
    ];

    // var mypolygon = new google.maps.Polygon({
    //     paths: mypolygonCoords,
    //     strokeColor: '#FF0000',
    //     strokeOpacity: 0.8,
    //     strokeWeight: 3,
    //     fillColor: '#8134DB',
    //     fillOpacity: 0.35
    // });

    // mypolygon.setMap(map);
    // mypolygon.addListener('click', clickPolygon);



    
}

// function clickPolygon(event){
//  // alert('you clicked my polygon')

//   infowindow.setContent('hhh');
// }

