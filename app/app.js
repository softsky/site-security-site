'use strict'

var PORT_LISTENER = process.env.NODE_PORT || process.env.PORT || 9000
console.log('I am listening to this port: http://localhost:%s', PORT_LISTENER)

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    errorhandler = require('errorhandler'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    http = require('http'),
    path = require('path'),
    _ = require('lodash'),
    dotenv = require('dotenv').config({silent:true}),
    redis_url = process.env.REDIS_PORT || process.env.REDIS_URL || 'redis://localhost:6379',
    redis  = require('url').parse(redis_url)

console.log(process.env)
console.log(redis_url)

var Promise = require('bluebird')
, seneca = Promise.promisifyAll(require('seneca')({timeout: 3000}))
        .use('redis-queue-transport', {
            'redis-queue': {
                timeout: 3000,
                type: 'redis-queue',
                url: redis_url
            }
        })
        .client( {type:'redis-queue'} )

var appConfig = require('./config/appConfig.json')
var proxy = require('express-http-proxy')
//
var app = express()

var {COOKIE_SECRET_KEY, SESSION_SECRET_KEY} = process.env
// all environments
app.set('port', PORT_LISTENER)
app.set('views', __dirname + '/views')
app.use(logger('dev'))
app.use(bodyParser({ keepExtensions: true, uploadDir: path.join(__dirname, appConfig.directories.publicDir) }))
app.use(methodOverride())
app.use(cookieParser(COOKIE_SECRET_KEY))
app.use(session({ resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET_KEY }))

// FIXME: currently we use 2 proxy libraries express-http-proxy and express-request-proxy
// stick to one
//var [protocol, host, port] = (process.env.API_PORT || 'tcp://localhost:3001').split(/\:/)
//host = host.replace(/\/\//, '')
//console.log('Host', host, 'Port', port)

console.log('Public dir:%s',path.resolve(__dirname, appConfig.directories.publicDir));
app.use(express.static(path.resolve(__dirname, appConfig.directories.publicDir)))

// router
app.use('/', require('./routes/index'))
app.use('/api', require('./routes/proxy'))

// development only
if ('development' === app.get('env')) {
    app.use(errorhandler())
}

http.createServer(app).listen(app.get('port'), '0.0.0.0', function () {
    console.log('Express server listening on port ' + app.get('port'))
})
