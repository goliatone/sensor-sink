/*
 * catch 404 and forward to error handler
 */
function _404(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

/*
 * development error handler
 * will print stacktrace
 */
function dev_500(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
        message: err.message,
        error: err
    });
}

/*
 * production error handler
 * no stacktraces leaked to user
 */
function _500(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
        message: err.message,
        error: {}
    });
}

module.exports = function(app, config){
    app.use(_404);
    if (app.get('env') === 'development') app.use(dev_500);
    app.use(_500);
};