var winston = require('winston');

/**
 * Expose
 */
module.exports = {
    env:'production',
    db: {
        path: 'mongodb://YOUR_APP/COL',
        options:{
            server:{
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    },
    multer:{
        dest: process.env.PWD + '/uploads/',
        rename: function (fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
        }
    },
    logging: {
        stream: {
            write: function (message, encoding) {
                winston.info(message);
            }
        }
    },
    cookieSession:{
        secret: 'secret',
        keys: ['wonder_app_key', 'wonder_app_key_2']
    }
};