var pendels;
$.getJSON('Pendels.json').done(function(json){
    pendels = json;
});

//--App var--//
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
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
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.setDefaults({
        title:  'Pendel',
        text: 'Je hebt geen voordelen beschikbaar'
    });
    
    //listen for android back btn
    document.addEventListener("backbutton", onBackClickEvent, false);
    //start the navigation
    Phonon.Navigator().start('overzicht');
}, false);

//hardware back button eventhandler
function onBackClickEvent() {
    Phonon.Navigator().changePage(Phonon.Navigator().getPreviousPage());
}

//--Navigation--//
Phonon.Navigator({
    defaultPage: 'overzicht',
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
var koeponsAvailable = 0;
var int = 0;
var WeetjeSeen = [false,false,false,false,false];

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
    var temp = koeponsAvailable;
    koeponsAvailable = $("#koeponlijst li").length;
    //prevent update when unnecessary
    if (temp !== koeponsAvailable) {
        cordova.plugins.backgroundMode.configure({
            text: 'Je hebt ' + koeponsAvailable + ' voordelen beschikbaar'
        });
    }
}, 7500);

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
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true });
}

//function to check if you are in the city
function checkCity(lat, lng) {
    if (lat.toFixed(3) >= 51.000&& lat.toFixed(3) <= 52.000) {
        if (lng.toFixed(3) >= 5.000 && lng.toFixed(3) <= 6.000) {
            inCity=true;
            $('#koeponlijst').empty();
            getKoepons();
            getWeetjes();
        } else {
            if(inCity){ notInCity(1);} 
            else {notInCity(0);}
        }
    } else {
        if(inCity){ notInCity(1);} 
        else {notInCity(0);}
    }
}

function getKoepons() {
    for (i = 0; i < 5; i++) {
        var lattemp = pendels.Pendels.Shoppen[i].lat;
        var lngtemp = pendels.Pendels.Shoppen[i].lng;
        if(lat >= lattemp-0.0025 && lat <= lattemp+0.0025){
            if(lng >= lngtemp-0.0025 && lng <= lngtemp+0.0025){
                $('#koeponlijst').append('<li><a href="#!detail/Shoppen'+i.toString()+'">' +
                    pendels.Pendels.Shoppen[i].titel + '</a></li>');
            }
        }
    }
}

function getWeetjes() {
    for (i = 0; i < 5; i++) {
        var lattemp = pendels.Pendels.Weetjes[i].lat;
        var lngtemp = pendels.Pendels.Weetjes[i].lng;
        if (lat >= lattemp - 0.0025 && lat <= lattemp + 0.0025) {
            if (lng >= lngtemp - 0.0025 && lng <= lngtemp + 0.0025) {
                $('#koeponlijst').append('<li><a class="weetje" href="#!detail/Weetjes' + i.toString() + '">' +
                        pendels.Pendels.Weetjes[i].titel + '</a></li>');
                notification(WeetjeSeen[i]);
                WeetjeSeen[i] = true;
                //alert(WeetjeSeen + " " + i + "\n" + WeetjeSeen[i]);
            }
        }
    }
}

function notInCity(val) {
    inCity=false;
    if(val===0) {
        navigator.notification.confirm(
            'Je krijgt alleen voordelen aangeboden als je in de stad bent',// message
            notifyOK,              // callback to invoke with index of button pressed
            'Je bent niet in Gemert',                                        // title
            ['OK']                                                    // buttonLabels
        );
    }
    if(val===1) {
        navigator.notification.confirm(
            'Tot de volgende keer!',                                  // message
            notifyOK,         // callback to invoke with index of button pressed
            'Leuk dat je er was',                                       // title
            ['OK']                                               // buttonLabels
        );
    }
}

function notifyOK() {
    cordova.plugins.backgroundMode.disable();
    Phonon.Navigator().changePage('welkom');
}

function notification(seen) {
    if (!seen) {
        navigator.vibrate([200, 100, 200]);
        navigator.notification.beep(1);
        navigator.notification.confirm(
            'We hebben een weetje voor je',                           // message
            weetjeOK,         // callback to invoke with index of button pressed
            'Gemert weetje',                                            // title
            ['Ok','Nope']                                               // buttonLabels
        );
    }
}

function weetjeOK(buttonIndex) {
    if(buttonIndex === 1){
        Phonon.Navigator().changePage('detail', 'Weetjes');
    }
}

function showGPS() {
    locationGPS();
    alert(lat+'\n'+lng);
}