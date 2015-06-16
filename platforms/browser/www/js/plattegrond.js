function initialize() {
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions)
}
google.maps.event.addDomListener(window, 'load', initialize);

$(".button-collapse").sideNav();
$('.button-collapse').sideNav('show');

$(".header-bar").click(function(){
    alert('boe');
    $('.button-collapse').sideNav('show');
});