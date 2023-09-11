require('./passport');
const cookieSession = require('cookie-session');
const express = require('express');
const server = express();
const routes = require('./routes/index.js');
const passport = require('passport');

server.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2'],
    debug: true
}));

server.use(function (request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb();
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb();
        }
    }
    next()
})
server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use(express.json())
server.use(express.urlencoded({ extended: true }));

server.use('/', routes);

module.exports = server;