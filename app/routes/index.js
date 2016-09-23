/**
 * Created with JetBrains WebStorm.
 * User: Abdelkrim
 * Date: 2013/08/21
 * Time: 00:00
 * Copyright (c) 2013 ALT-F1, We believe in the projects we work on™
 */
/*
 * GET home page.
 */

var express = require('express')
, _ = require('lodash')
, jade = require('jade')
, fs = require('fs')
, webshot = require('webshot')
, marked = require('marked')
, dotenv = require('dotenv').config()
, request = require('request')
, MarkedMetaData = require('marked-metadata')
, hljs = require('highlight.js')

// , redis = require('redis')
, requestProxy = require('express-request-proxy')

, seneca = require('seneca')()
    // .client({
    // 	type: 'http',
    // 	port: '3001',
    // 	host: 'localhost',
    // 	protocol: 'http'
    // });

// require('redis-streams')(redis);

marked.setOptions({
    renderer: new marked.Renderer(),
    header: false,
    gfm: true,
    tables: true,
    // breaks: false,
    // pedantic: false,
    // sanitize: true,
    // smartLists: true,
    // smartypants: false
    highlight: function (code) {
	console.log('CODE:', code);
	return hljs.highlightAuto(code).value;
    }
});

module.exports = (function () {
    'use strict';
    var router = express.Router();

    router.get('/', function (req, res) {
        res.render('index',{
            'pathToAssets': '/bootstrap-3.3.1',
            'pathToSelectedTemplateWithinBootstrap' : '/bootstrap-3.3.1/docs/examples/' + 'carousel',
	    'carousel': jade.renderFile('app/views/carousel.jade')
        });
    });
    router.get('/:id', function (req, res) {
	var id = req.params.id;
        res.render(id,{
            'pathToAssets': '/bootstrap-3.3.1',
	    // FIXME: when remove carousel design gets smashed. Fix
	    'carousel': jade.renderFile('app/views/carousel.jade')
        });
    });
    
    router.get('/about', function (req, res) {
        res.redirect('http://www.alt-f1.be');
    });
    router.get('/contact', function (req, res) {
        res.redirect('http://www.alt-f1.be/contact-us.html');
    });
    router.get('/template/:selectedTemplate', function (req, res) {
        res.render('bootstrap3-templates/' + req.params.selectedTemplate, {
            'pathToAssets': '/bootstrap-3.3.1',
            'pathToSelectedTemplateWithinBootstrap' : '/bootstrap-3.3.1/docs/examples/' + req.params.selectedTemplate
        });
    });
    router.get('/security/report/:id', function (req, res) {
	// seneca.act({role:'web', cmd:'list', name:'ww', 'q.id':req.params.id}, function (err, msg){
        //     res.render('bootstrap3-templates/dashboard', _.extend({
	// 	'pathToAssets': '/bootstrap-3.3.1',
	// 	'pathToSelectedTemplateWithinBootstrap' : '/bootstrap-3.3.1/docs/examples/dashboard'
        //     }, msg));
	// });
    });

    router.get('/api/:role/:cmd/:host', requestProxy({
	//cache: redis.createClient(),
	//cacheMaxAge: 3600,
	url: "http://localhost:3001/api/:role/:cmd/:host",
	// query: {
	//     secret_key: process.env.SOMEAPI_SECRET_KEY
	// },
	// headers: {
	//     'X-Custom-Header': process.env.SOMEAPI_CUSTOM_HEADER
    }));

    
    var access_object = {}
    , updateSendPulseAccessToken = () => {
	const data = {
	    grant_type:'client_credentials',
	    client_id:process.env.SENDPULSE_CLIENT_ID,
	    client_secret:process.env.SENDPULSE_CLIENT_SECRET
	};

	console.log('Sending', data);
	request.post({url:'https://api.sendpulse.com/oauth/access_token', form: data}, (err, response, body) => {
	    access_object = JSON.parse(body);
	    setTimeout(updateSendPulseAccessToken, 3600 * 1000);
	    console.log(err, access_object); 
	});
    };

    updateSendPulseAccessToken()
    
    
    router.all('/sendpulse/*', (req, res, next) => {
	// TODO think how to move it out of innter proc
	const headers = {
	    Authorization: `${access_object.token_type} ${access_object.access_token}`
	};
	console.log(req.path, req.body);
	return requestProxy({
	    //cache: redis.createClient(),
	    //cacheMaxAge: 3600,
	    url: 'http://api.sendpulse.com/*',
	    headers: headers
	})(req, res, next);
    });
    
    router.get('/ws/:url', (req, res, next) => {
	var url = req.params.url;
	var fname = `${url}.png`;
	var webshot = require('webshot');
	var userAgent = req.headers['user-agent'];
	console.log(userAgent, req.params.options);
	var options = _.extend({
	    // screenSize: {
	    // 	width: '800'
	    // 	, height: '600'
	    // },
	    // shotSize: {
	    // 	width: '300'
	    // 	, height: 'all'
	    // },
	    //  userAgent: userAgent
	}, req.params.options?JSON.parse(req.params.options):{});

	console.log('Capturing screenshot:', options);
	res.writeHead(200, {'Content-Type': 'image/png' });
	// stream the file
	var renderStream = webshot(url, options);
	
	renderStream.on('data', res.write.bind(res));
	renderStream.on('end', res.end.bind(res));

    });
    
    // Generic section
    router.get('/:section/:id', (req, res, next) => {
	var id = req.params.id
	, section = req.params.section;
	
	if(['css','img','media', 'js'].indexOf(section) > -1){
	    next();
	    return;
	}
	
	var mkmd = new MarkedMetaData(`app/views/${section}/${id}.md`);
	var md = {};
	try {
	    md = mkmd.metadata();
	}catch(e){
	    console.log('No metadata found');
	}
	
        res.render(md.layout || 'section',{
	    title: md.title,
            pathToAssets: '/bootstrap-3.3.1',
            pathToSelectedTemplateWithinBootstrap : '/bootstrap-3.3.1/docs/examples/' + 'carousel',
	    carousel: jade.renderFile('app/views/carousel.jade'),
	    body: fs.existsSync(`app/views/${section}/${id}.jade`)?
		jade.renderFile(`app/views/${section}/${id}.jade`):mkmd.markdown()
        });	
    });
            
    return router;
})();
