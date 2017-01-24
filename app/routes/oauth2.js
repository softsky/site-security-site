var express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINEKDIN_CLIENT_SECRET,
    callbackURL: 'http://localhost:9000/oauth2/linkedin/callback',
    scope: ['r_basicprofile', 'r_emailaddress'],
    state: true,
     profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
}, function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
        console.log('++++++++ nextTick called', accessToken, refreshToken, profile, done);
        
        // To keep the example simple, the user's LinkedIn profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the LinkedIn account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
    });
}));


module.exports = (function () {
    'use strict';
    var router = express.Router();



    router
    //************* PASSPORT
    // LinkedIn
        .get('/linkedin', 
             passport.authenticate('linkedin', { state: 'SOME STATE'}))
        .get('/linkedin/callback', passport.authenticate('linkedin', {
            failureRedirect: '/login'
        }), (req, res) =>{
            req.json(req.user);
        } );
    
    return router;
})();

