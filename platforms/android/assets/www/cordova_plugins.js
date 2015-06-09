cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.vibration/www/vibration.js",
        "id": "org.apache.cordova.vibration.notification",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "file": "plugins/eu.mobilion.ibeacon/www/ibeacon.js",
        "id": "eu.mobilion.ibeacon.ibeacon",
        "clobbers": [
            "ibeacon"
        ]
    },
    {
        "file": "plugins/eu.mobilion.ibeacon/www/region.js",
        "id": "eu.mobilion.ibeacon.region"
    },
    {
        "file": "plugins/eu.mobilion.ibeacon/www/beacon.js",
        "id": "eu.mobilion.ibeacon.beacon"
    },
    {
        "file": "plugins/eu.mobilion.ibeacon/www/helper.js",
        "id": "eu.mobilion.ibeacon.helper"
    },
    {
        "file": "plugins/eu.mobilion.ibeacon/www/defaults.js",
        "id": "eu.mobilion.ibeacon.defaults"
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/www/Toast.js",
        "id": "nl.x-services.plugins.toast.Toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/test/tests.js",
        "id": "nl.x-services.plugins.toast.tests"
    },
    {
        "file": "plugins/org.transistorsoft.cordova.background-geolocation/www/BackgroundGeoLocation.js",
        "id": "org.transistorsoft.cordova.background-geolocation.BackgroundGeoLocation",
        "clobbers": [
            "plugins.backgroundGeoLocation"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.background-mode/www/background-mode.js",
        "id": "de.appplant.cordova.plugin.background-mode.BackgroundMode",
        "clobbers": [
            "cordova.plugins.backgroundMode",
            "plugin.backgroundMode"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "id": "cordova-plugin-dialogs.notification_android",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "org.apache.cordova.vibration": "0.3.13",
    "eu.mobilion.ibeacon": "0.0.0",
    "nl.x-services.plugins.toast": "2.0.4",
    "org.transistorsoft.cordova.background-geolocation": "0.3.6",
    "de.appplant.cordova.plugin.background-mode": "0.6.4",
    "cordova-plugin-geolocation": "1.0.0",
    "cordova-plugin-dialogs": "1.1.0",
    "org.apache.cordova.device": "0.3.0"
}
// BOTTOM OF METADATA
});