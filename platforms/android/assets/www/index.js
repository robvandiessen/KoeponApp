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
    // Register the event listener
    document.addEventListener("backbutton", onBackKeyDown, false);
}

//start the navigation
var onDeviceReady = function () {
	Phonon.Navigator().start('home');
};
document.addEventListener('deviceready', onDeviceReady, false);

//hardware back button eventhandler
function onBackKeyDown() {
    
}

//--Navigation--//
Phonon.Navigator({
    defaultPage: 'home',
    templatePath: 'tpl',
    pageAnimations: true
});

//Home
Phonon.Navigator().on({page: 'home', template: 'home', asynchronous: false}, function(activity) {
    //Here you can call functions on page load, quit etc
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