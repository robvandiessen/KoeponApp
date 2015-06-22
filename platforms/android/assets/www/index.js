var pendels;
$.getJSON('Pendels.json').done(function(json) {
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
document.addEventListener('deviceready', function() {
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.setDefaults({
        title: 'Pendel',
        text: 'Je hebt geen voordelen beschikbaar'
    });

    //listen for android back btn
    document.addEventListener("backbutton", onBackClickEvent, false);
    //start the navigation
    Phonon.Navigator().start('uitleg1');
}, false);

//hardware back button eventhandler
function onBackClickEvent() {
    var prev = Phonon.Navigator().getPreviousPage();
    Phonon.Navigator().changePage(prev);
}

//--Navigation--//
Phonon.Navigator({
    defaultPage: 'uitleg1',
    templatePath: 'tpl',
    pageAnimations: true
});

//uitleg 1
Phonon.Navigator().on({page: 'uitleg1', template: 'uitleg1', asynchronous: false}, function(activity) {
    //Here you can call functions on page load, quit etc
    activity.onCreate(function(self, el, req) {
        inCity = false;
    });
    activity.onReady(function(self, el, req) {
    });
    activity.onTransitionEnd(function() {
    });
    activity.onQuit(function(self) {
    });
    activity.onHidden(function(el) {
    });
});

//uitleg 2
Phonon.Navigator().on({page: 'uitleg2', template: 'uitleg2', asynchronous: false}, function(activity) {
    activity.onCreate(function(self, el, req) {
    });
    activity.onReady(function(self, el, req) {
    });
    activity.onTransitionEnd(function() {
    });
    activity.onQuit(function(self) {
    });
    activity.onHidden(function(el) {
    });
});

//Welkom
Phonon.Navigator().on({page: 'welkom', template: 'welkom', asynchronous: false}, function(activity) {
    activity.onCreate(function(self, el, req) {
    });
    activity.onReady(function(self, el, req) {
        inCity = false;
        //locationGPS();
    });
    activity.onTransitionEnd(function() {
    });
    activity.onQuit(function(self) {
    });
    activity.onHidden(function(el) {
    });
});

//Overzicht
Phonon.Navigator().on({page: 'overzicht', template: 'overzicht', asynchronous: false}, function(activity) {
    activity.onCreate(function(self, el, req) {
    });
    activity.onReady(function(self, el, req) {
        //quick gps response by using previous location
        ageGPS = 15000;
        locationGPS();
        ageGPS = 3000;
    });
    activity.onTransitionEnd(function() {
    });
    activity.onQuit(function(self) {
    });
    activity.onHidden(function(el) {
    });
});

//Detail
Phonon.Navigator().on({page: 'detail', template: 'detail', asynchronous: false}, function(activity) {
    activity.onCreate(function(self, el, req) {
    });
    activity.onReady(function(self, el, req) {
        getDetails(req.myParam);
    });
    activity.onTransitionEnd(function() {
    });
    activity.onQuit(function(self) {
    });
    activity.onHidden(function(el) {
    });
}, 'detail/:myParam');

//Plattegrond
Phonon.Navigator().on({page: 'plattegrond', template: 'plattegrond', asynchronous: false}, function(activity) {
    activity.onCreate(function(self, el, req) {
    });
    activity.onReady(function(self, el, req) {
        document.getElementById('maps').src = "https://www.google.com/maps/embed/v1/search?key=AIzaSyCivTdNSJC1KC7fbPhaB3p08zdY5QHsAqU&center=" + lat + "," + lng + "&zoom=18&q=winkels+in+Gemert";
    });
    activity.onTransitionEnd(function() {
    });
    activity.onQuit(function(self) {
    });
    activity.onHidden(function(el) {
    });
});


//--Functions--//
//vars
var lat;
var lng;
var inCity;
var updateTime = 1000;

var koeponsAvailable = 0;
var weetjeIndex;

var WeetjeSeen = [false, false, false, false, false];
var horecaUsed = [false, false, false, false, false];
var cultuurUsed = [false, false, false, false, false];
var entertainmentUsed = [false, false, false, false, false];
var shoppenUsed = [false, false, false, false, false];
var showHoreca = true;
var showCultuur = true;
var showEntertainment = true;
var showShoppen = true;
var ageGPS = 300;
var errorGPS = false;

var pendelRadius = 3;//0.0001;

//sorting stuff
function filterEvent(filter){
    if (filter === 'entertainment') {
        showEntertainment = !showEntertainment;
        if(showEntertainment){
            $('#filterEntertain').addClass('filterOn');
            $('#filterEntertain').removeClass('filterOff');
        } else {
            $('#filterEntertain').addClass('filterOff');
            $('#filterEntertain').removeClass('filterOn');
        }
    }
    else if (filter === 'horeca') {
        showHoreca = !showHoreca;
        if(showHoreca){
            $('#filterHoreca').addClass('filterOn');
            $('#filterHoreca').removeClass('filterOff');
        } else {
            $('#filterHoreca').addClass('filterOff');
            $('#filterHoreca').removeClass('filterOn');
        }
    }
    else if (filter === 'shoppen') {
        showShoppen = !showShoppen;
        if(showShoppen){
            $('#filterShoppen').addClass('filterOn');
            $('#filterShoppen').removeClass('filterOff');
        } else {
            $('#filterShoppen').addClass('filterOff');
            $('#filterShoppen').removeClass('filterOn');
        }
    }
    else if (filter === 'cultuur') {
        showCultuur = !showCultuur;
        if(showCultuur){
            $('#filterCultuur').addClass('filterOn');
            $('#filterCultuur').removeClass('filterOff');
        } else {
            $('#filterCultuur').addClass('filterOff');
            $('#filterCultuur').removeClass('filterOn');
        }
    }
    //quick gps response by using previous location
    ageGPS = 15000;
    locationGPS();
    ageGPS = 300;
}

//update timers
window.setInterval(function() {
    if (!inCity) {
        locationGPS();
    }
}, 300000);

window.setInterval(function() {
    if (inCity) {
        ageGPS = 300;
        locationGPS();
        //window.plugins.toast.showShortBottom('Update');
        //showGPS();
    }
    var temp = koeponsAvailable;
    //koeponsAvailable = document.getElementsByClassName('pendelLijst').childElementCount;
    koeponsAvailable = $('.a_overzicht').length;
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
        checkCity(lat, lng);
    };

    function onError(error) {
        if (!errorGPS) {
            errorGPS = true;
            /*navigator.notification.confirm(
                    'Je telefoon kon de locatie niet vastleggen, probeer het nogmaals', // message
                    gpsOK, // callback to invoke with index of button pressed
                    'GPS Fout',                                         // title
                    ['OK']                                       // buttonLabels
                    );*/
            window.plugins.toast.showLongBottom('GPS Error');
        }
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {maximumAge: ageGPS, timeout: 5000, enableHighAccuracy: true});
}

//function to check if you are in the city
function checkCity(lat, lng) {
    if (lat.toFixed(3) >= 50.000 && lat.toFixed(3) <= 52.000) {
        if (lng.toFixed(3) >= 5.000 && lng.toFixed(3) <= 7.000) {
            inCity = true;
            $('#content_overzicht').empty();
            getWeetjes();
            getKoepons();
        } else {
            if (inCity) {
                notInCity(1);
            }
            else {
                notInCity(0);
            }
        }
    } else {
        if (inCity) {
            notInCity(1);
        }
        else {
            notInCity(0);
        }
    }
}

function getKoepons() {
    for (i = 0; i < 5; i++) {
        //Horeca
        var lattemp = pendels.Pendels.Horeca[i].lat;
        var lngtemp = pendels.Pendels.Horeca[i].lng;
        if (showHoreca && !horecaUsed[i]) {
            if (lat >= lattemp - pendelRadius && lat <= lattemp + pendelRadius) {
                if (lng >= lngtemp - pendelRadius && lng <= lngtemp + pendelRadius) {
                    $('#content_overzicht').append(
                            '<a class="a_overzicht grey-text.text-darken-4" href="#!detail/Horeca'
                            + i.toString() + '">'
                            + '<img src=' + pendels.Pendels.Horeca[i].logo + ' class="listimg_overzicht">'
                            + '<div class="text_overzicht">'
                            + '<p class="subscr_overzicht grey-text text-darken-4">' +
                            pendels.Pendels.Horeca[i].titel + '</p>'
                            + '<p class="cat_overzicht grey-text text-darken-1">Horeca</p>'
                            + '<p class="adress_overzicht grey-text text-lighten-1">&nbsp;-&nbsp;' +
                            pendels.Pendels.Horeca[i].adres + '</p>'
                            + '</div></a><div style="clear:both"></div>'
                            );
                }
            }
        }

        //Cultuur
        var lattemp = pendels.Pendels.Cultuur[i].lat;
        var lngtemp = pendels.Pendels.Cultuur[i].lng;
        if (showCultuur && !cultuurUsed[i]) {
            if (lat >= lattemp - pendelRadius && lat <= lattemp + pendelRadius) {
                if (lng >= lngtemp - pendelRadius && lng <= lngtemp + pendelRadius) {
                    $('#content_overzicht').append(
                            '<a class="a_overzicht grey-text.text-darken-4" href="#!detail/Cultuur'
                            + i.toString() + '">'
                            + '<img src=' + pendels.Pendels.Cultuur[i].logo + ' class="listimg_overzicht">'
                            + '<div class="text_overzicht">'
                            + '<p class="subscr_overzicht grey-text text-darken-4">' +
                            pendels.Pendels.Cultuur[i].titel + '</p>'
                            + '<p class="cat_overzicht grey-text text-darken-1">Cultuur</p>'
                            + '<p class="adress_overzicht grey-text text-lighten-1">&nbsp;-&nbsp;' +
                            pendels.Pendels.Cultuur[i].adres + '</p>'
                            + '</div></a><div style="clear:both"></div>'
                            );
                }
            }
        }

        //Entertainment
        var lattemp = pendels.Pendels.Entertainment[i].lat;
        var lngtemp = pendels.Pendels.Entertainment[i].lng;
        if (showEntertainment && !entertainmentUsed[i]) {
            if (lat >= lattemp - pendelRadius && lat <= lattemp + pendelRadius) {
                if (lng >= lngtemp - pendelRadius && lng <= lngtemp + pendelRadius) {
                    $('#content_overzicht').append(
                            '<a class="a_overzicht grey-text.text-darken-4" href="#!detail/Entertainment'
                            + i.toString() + '">'
                            + '<img src=' + pendels.Pendels.Entertainment[i].logo + ' class="listimg_overzicht">'
                            + '<div class="text_overzicht">'
                            + '<p class="subscr_overzicht grey-text text-darken-4">' +
                            pendels.Pendels.Entertainment[i].titel + '</p>'
                            + '<p class="cat_overzicht grey-text text-darken-1">Entertainment</p>'
                            + '<p class="adress_overzicht grey-text text-lighten-1">&nbsp;-&nbsp;' +
                            pendels.Pendels.Entertainment[i].adres + '</p>'
                            + '</div></a><div style="clear:both"></div>'
                            );
                }
            }
        }

        //Shoppen
        var lattemp = pendels.Pendels.Shoppen[i].lat;
        var lngtemp = pendels.Pendels.Shoppen[i].lng;
        if (showShoppen && !shoppenUsed[i]) {
            if (lat >= lattemp - pendelRadius && lat <= lattemp + pendelRadius) {
                if (lng >= lngtemp - pendelRadius && lng <= lngtemp + pendelRadius) {

                    $('#content_overzicht').append(
                            '<a class="a_overzicht grey-text.text-darken-4" href="#!detail/Shoppen'
                            + i.toString() + '">'
                            + '<img src=' + pendels.Pendels.Shoppen[i].logo + ' class="listimg_overzicht">'
                            + '<div class="text_overzicht">'
                            + '<p class="subscr_overzicht grey-text text-darken-4">' +
                            pendels.Pendels.Shoppen[i].titel + '</p>'
                            + '<p class="cat_overzicht grey-text text-darken-1">Shoppen</p>'
                            + '<p class="adress_overzicht grey-text text-lighten-1">&nbsp;-&nbsp;' +
                            pendels.Pendels.Shoppen[i].adres + '</p>'
                            + '</div></a><div style="clear:both"></div>'
                            );
                }
            }
        }
    }
}

function getWeetjes() {
    for (i = 0; i < 5; i++) {
        var lattemp = pendels.Pendels.Weetjes[i].lat;
        var lngtemp = pendels.Pendels.Weetjes[i].lng;
        if (lat >= lattemp - pendelRadius && lat <= lattemp + pendelRadius) {
            if (lng >= lngtemp - pendelRadius && lng <= lngtemp + pendelRadius) {

                $('#content_overzicht').append(
                        '<a class="a_overzicht grey-text.text-darken-4" href="#!detail/Weetjes'
                        + i.toString() + '">'
                        + '<img src=' + pendels.Pendels.Weetjes[i].logo + ' class="listimg_overzicht">'
                        + '<div class="text_overzicht">'
                        + '<p class="subscr_overzicht grey-text text-darken-4">' +
                        pendels.Pendels.Weetjes[i].titel + '</p>'
                        + '<p class="cat_overzicht grey-text text-darken-1">Weetjes</p>'
                        + '</div></a><div style="clear:both"></div>'
                        );

                //$('#koeponlijst').append('<li><a class="weetje" href="#!detail/Weetjes' + i.toString() + '">' +
                //        pendels.Pendels.Weetjes[i].titel + '</a></li>');
                weetjeIndex = i;
                notification(WeetjeSeen[i]);
                WeetjeSeen[i] = true;
            }
        }
    }
}

function notInCity(val) {
    inCity = false;
    if (val === 0) {
        navigator.notification.confirm(
                'Je krijgt alleen voordelen aangeboden als je in de stad bent', // message
                notifyOK, // callback to invoke with index of button pressed
                'Je bent niet in Gemert', // title
                ['OK']                                                    // buttonLabels
                );
    }
    if (val === 1) {
        navigator.notification.confirm(
                'Tot de volgende keer!', // message
                notifyOK, // callback to invoke with index of button pressed
                'Leuk dat je er was', // title
                ['OK']                                               // buttonLabels
                );
    }
}

function notifyOK() {
    cordova.plugins.backgroundMode.disable();
    Phonon.Navigator().changePage('welkom');
}

function gpsOK() {
    errorGPS = false;
    ageGPS = 15000;
    locationGPS();
    ageGPS = 300;
}

function notification(seen) {
    if (!seen) {
        navigator.vibrate([200, 100, 200]);
        navigator.notification.beep(1);
        navigator.notification.confirm(
                'We hebben een weetje voor je',                       // message
                weetjeOK,     // callback to invoke with index of button pressed
                'Gemert weetje', // title
                ['Toon', 'OK']                                   // buttonLabels
                );
    }
}

function weetjeOK(buttonIndex) {
    if (buttonIndex === 1) {
        Phonon.Navigator().changePage('detail', 'Weetjes'+weetjeIndex);
    }
}

function showGPS() {
    locationGPS();
    alert(lat + '\n' + lng);
}