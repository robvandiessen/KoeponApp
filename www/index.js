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

//hardware back button
function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
}

//hardware back button eventhandler
function onBackKeyDown() {
    //Phonon.Navigator().changePage(Phonon.Navigator().getPreviousPage());
}

//start the navigation
var onDeviceReady = function () {
	Phonon.Navigator().start('uitleg1');
};
document.addEventListener('deviceready', onDeviceReady, false);

//--Navigation--//
Phonon.Navigator({
    defaultPage: 'uitleg1',
    templatePath: 'tpl',
    pageAnimations: true
});

//uitleg 1
Phonon.Navigator().on({page: 'uitleg1', template: 'uitleg1', asynchronous: false}, function(activity) {
    //Here you can call functions on page load, quit etc
    activity.onCreate(function(self, el, req) {});
    activity.onReady(function(self, el, req) {});
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
    activity.onReady(function(self, el, req) {});
    activity.onTransitionEnd(function() {});
    activity.onQuit(function(self) {});
    activity.onHidden(function(el) {});
});

//Niet in de stad
Phonon.Navigator().on({page: 'geenStad', template: 'geenStad', asynchronous: false}, function(activity) {
    activity.onCreate(function(self, el, req) {});
    activity.onReady(function(self, el, req) {});
    activity.onTransitionEnd(function() {});
    activity.onQuit(function(self) {});
    activity.onHidden(function(el) {});
});