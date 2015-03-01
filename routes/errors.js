/*
 * catch 404 and forward to error handler
 */
function _404(req, res, next) {
    res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not found'
    });
}

/*
 * production error handler
 * no stacktraces leaked to user
 */
function _500(err, req, res, next) {
    // treat as 404
    if (err.message
        && (~err.message.indexOf('not found')
        || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
    }

    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
}

module.exports = function(app, config){
    app.use(_500);
    app.use(_404);
};