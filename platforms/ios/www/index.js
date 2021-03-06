var pendels;
$.getJSON('Pendels.json').done(function(json){
    pendels = json;
    //alert(pendels.Pendels.Horeca[0].img);
});

//--App var--//
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
app.initialize();

//--dependencies, utilities & eventlisteners--//
//Load fastclick
$(function() {
    FastClick.attach(document.body);
});

// Enable & setup backgroundmode
document.addEventListener('deviceready', function () {
    //alert('bg enable');
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.setDefaults({
        title:  'Pendel',
        text: 'Pen, Pendel, Pendulum '
    });
}, false);

//hardware back button
function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
}

//hardware back button eventhandler
function onBackKeyDown() {
    alert('back');
    //Phonon.Navigator().changePage(Phonon.Navigator().getPreviousPage());
}

//start the navigation
var onDeviceReady = function () {
	Phonon.Navigator().start('plattegrond');
};
document.addEventListener('deviceready', onDeviceReady, false);

//--Navigation--//
Phonon.Navigator({
    defaultPage: 'plattegrond',
    templatePath: 'tpl',
    pageAnimations: true
});

//uitleg 1
Phonon.Navigator().on({page: 'uitleg1', template: 'uitleg1', asynchronous: false}, function(activity) {
    //Here you can call functions on page load, quit etc
    activity.onCreate(function(self, el, req) {
        inCity=false;
    });
    activity.onReady(function(self, el, req) {
        locationGPS();
    });
    activity.onTransitionEnd(function() {});
    activity.onQuit(function(self) {});
    activity.onHidden(function(el) {});
});

//uitleg 2
Phonon.Navigator().on({page: 'uitleg2', template: 'uitleg2', asynchronous: false}, function(activity) {
    activity.onCreate(function(self, el, req) {});
    activity.onReady(function(self, el, req) {});
    activity.onTransitionEnd(function() {});
    activity.onQuit(function(self) {});
    activity.onHidden(function(el) {});
});

//Welkom
Phonon.Navigator().on({page: 'welkom', template: 'welkom', asynchronous: false}, function(activity) {
    activity.onCreate(function(self, el, req) {});
    activity.onReady(function(self, el, req) {});
    activity.onTransitionEnd(function() {});
    activity.onQuit(function(self) {});
    activity.onHidden(function(el) {});
});

//Overzicht
Phonon.Navigator().on({page: 'overzicht', template: 'overzicht', asynchronous: false}, function(activity) {
    activity.onCreate(function(self, el, req) {});
    activity.onReady(function(self, el, req) {});
    activity.onTransitionEnd(function() {});
    activity.onQuit(function(self) {});
    activity.onHidden(function(el) {});
});

//Detail
Phonon.Navigator().on({page: 'detail', template: 'detail', asynchronous: false}, function(activity) {
    activity.onCreate(function(self, el, req) {});
    activity.onReady(function(self, el, req) {
        var paramVal = req.myParam;
        getDetails(paramVal);
    });
    activity.onTransitionEnd(function() {});
    activity.onQuit(function(self) {});
    activity.onHidden(function(el) {});
},'detail/:myParam');

//Plattegrond
Phonon.Navigator().on({page: 'plattegrond', template: 'plattegrond', asynchronous: false}, function(activity) {
    activity.onCreate(function(self, el, req) {});
    activity.onReady(function(self, el, req) {});
    activity.onTransitionEnd(function() {});
    activity.onQuit(function(self) {});
    activity.onHidden(function(el) {});
});


//--Functions--//
//vars
var lat;
var lng;
var inCity;
var updateTime = 1000;
var category='Shoppen';
var allCategories;

var koepons = [1,2,3,4,5,6,7,8,9,0];
var int = 0;

//update timer
locationGPS();
window.setInterval(function(){
    if(!inCity) {
        locationGPS();
    }
}, 300000);

window.setInterval(function(){
    if(inCity){
        locationGPS();
        window.plugins.toast.showShortBottom('Update');
    }
}, 15000);

function locationGPS() {
    var onSuccess = function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        checkCity(lat,lng);
    };

    function onError(error) {
        navigator.notification.confirm(
            'Je telefoon kon de locatie niet vastleggen, probeer het nogmaals', // message
            notifyOK,         // callback to invoke with index of button pressed
            'GPS Fout',                                                 // title
            ['OK']                                               // buttonLabels
        );
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

//function to check if you are in the city
function checkCity(lat, lng) {
    if (lat.toFixed(3) >= 51.450 && lat.toFixed(3) <= 51.454) {
        if (lng.toFixed(3) >= 5.480 && lng.toFixed(3) <= 5.486) {
            inCity=true;
            getKoepons();
        } else {notInCity();}
    } else {notInCity();}
}

function getKoepons() {
    int++;
    $('#koeponlijst').empty();
    for (i = 0; i < 5; i++) {
        var lattemp = pendels.Pendels.Shoppen[i].lat;
        var lngtemp = pendels.Pendels.Shoppen[i].lng;
        if(lat >= lattemp-0.0005 && lat <= lattemp+0.0005){
            if(lng >= lngtemp-0.0005 && lng <= lngtemp+0.0005){
                $('#koeponlijst').append('<li><a href="#!detail/Shoppen'+i.toString()+'">' +
                    pendels.Pendels.Shoppen[i].titel + '</a></li>');
            }
        }
    }
}

function notInCity() {
    inCity=false;
    navigator.notification.confirm(
        'Ju bent nied in Geemurt',                                    // message
        notifyOK,             // callback to invoke with index of button pressed
        'Pipoo',                                                        // title
        ['OK']                                                   // buttonLabels
    );
}

function notifyOK() {
    
}

function showGPS() {
    locationGPS();
    alert(lat+'\n'+lng);
}