const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timestap = new Date().getDate();
    return jwt.encode({ sub: user.id, iat: timestap }, config.secret);
}

exports.signin = function(req, res, next) {
    res.json({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).json({ error: 'You must provide email and password'});
    }
    // Search if a user with the given email exists
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }

        // If a user with email does exist, return an error
        if (existingUser) {
            return res.status(422).json({ error: 'Email is in use'});
        }

        // If a user with email does NOT exist, create and save the user record
        const user = User({
            email: email,
            password: password
        });

        user.save( function(err) {
            if (err) { return next(err); }

            // Respond to request indicating the user was created
            res.json({ token: tokenForUser(user) });
        });
    });
}