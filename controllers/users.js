/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../lib/utils');

module.exports = function register(app){

    var passport = app.get('passport');

    app.get('/login', Users.login);

    app.get('/signup', Users.signup);

    app.get('/logout', Users.logout);

    app.post('/users', Users.create);

    app.post('/users/session',
        passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: 'Invalid email or password.'
        }),
        Users.session
    );

    app.get('/users/:userId', Users.show);


    app.param('userId', Users.load);
};

function Users(){}

/**
 * Load
 */
Users.load = function (req, res, next, id) {
    var options = {
        criteria: { _id : id }
    };

    User.load(options, function (err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User ' + id));
        req.profile = user;
        next();
    });
};

/**
 * Create user
 */
Users.create = function (req, res) {
    var user = new User(req.body);

    user.provider = 'local';

    user.save(function (err) {
        if (err) {
            return res.render('users/signup', {
                error: utils.errors(err.errors),
                user: user,
                title: 'Sign up'
            });
        }
        // manually login the user once successfully signed up
        req.logIn(user, function(err) {
            if (err) req.flash('info', 'Sorry! We are not able to log you in!');
            return res.redirect('/');
        });
    });
};

/**
 *  Show profile
 */
Users.show = function (req, res) {
    var user = req.profile;
    res.render('users/show', {
        title: user.name,
        user: user
    });
};

Users.signin = function (req, res) {};

/**
 * Auth callback
 */
Users.authCallback = login;

/**
 * Show login form
 */
Users.login = function (req, res) {
    res.render('users/login', {
        title: 'Login'
    });
};

/**
 * Show sign up form
 */
Users.signup = function (req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */
Users.logout = function (req, res) {
    req.logout();
    res.redirect('/login');
};

/**
 * Session
 */
Users.session = login;

/**
 * Login
 */
function login (req, res) {
    var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
    delete req.session.returnTo;
    res.redirect(redirectTo);
}