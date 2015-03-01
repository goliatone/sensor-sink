function populateEnv(){
    /*!
     * Module dependencies.
     */
    var fs = require('fs');
    var env = {};
    var envFile = __dirname + '/.env.json';

    /*
     * If no .env.json file, move on
     * NOTE: This is just for DEV environment
     * do not do on prod :)
     */
    if (!fs.existsSync(envFile)) return;

    env = fs.readFileSync(envFile, 'utf-8');
    //TODO: Should we catch this?
    env = JSON.parse(env);

    Object.keys(env).forEach(function (key) {
        process.env[key] = env[key];
    });
}

populateEnv();

/*
 * NOTICE: We are mocking mongodb with
 * tungus. Before any calls to mongodb
 * or mongoose we HAVE TO require tungus!
 */
require('tungus');

/**
 * Expose
 */
module.exports = {
    db: {
        path: 'tingodb://' + process.env.PWD + '/models/data',
        options:{
            server:{
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    }
};