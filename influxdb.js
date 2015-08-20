/*jshint node:true, laxcomma:true */

var config = require('./lib/config'),
    carbon = require('./lib/carbon'),
    collectd = require('./lib/collectd'),
    influxdb = require('./lib/influxdb'),
    tel = require('./lib/tel');


/**
 *
 */
config.configFile(process.argv[2], function (config) {

    // start the process to refresh accounts from TEL
    tel.setupAccounts(config).on('accountsChanged', function (accounts) {
        config.destinations = influxdb.indexDestinations(config);
    });

    // create TCP server for carbon proxy
    carbon.createServer(config);


    // create restify HTTP server for CollectD
    collectd.createServer(config);
});
