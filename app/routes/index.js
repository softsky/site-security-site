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
, dotenv = require('dotenv').config({silent:true})
, request = require('request')
, MarkedMetaData = require('marked-metadata')
, hljs = require('highlight.js')

// , redis = require('redis')
, requestProxy = require('express-request-proxy');
// , seneca = require('seneca')();

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
    
    // router.get('/security/report/:id', function (req, res) {
    //     // seneca.act({role:'web', cmd:'list', name:'ww', 'q.id':req.params.id}, function (err, msg){
    //     //     res.render('bootstrap3-templates/dashboard', _.extend({
    //     //      'pathToAssets': '/bootstrap-3.3.1',
    //     //      'pathToSelectedTemplateWithinBootstrap' : '/bootstrap-3.3.1/docs/examples/dashboard'
    //     //     }, msg));
    //     // });
    // });

    // var access_object = {};
    // var updateSendPulseAccessToken = () => {
    //     const data = {
    //         grant_type:'client_credentials',
    //         client_id:process.env.SENDPULSE_CLIENT_ID,
    //         client_secret:process.env.SENDPULSE_CLIENT_SECRET
    //     };

    //     console.log('Sending', data);
    //     request.post({url:'https://api.sendpulse.com/oauth/access_token', form: data}, (err, response, body) => {
    //         access_object = JSON.parse(body);
    //         setTimeout(updateSendPulseAccessToken, 3600 * 1000);
    //         console.log(err, access_object);
    //     });
    // };

    // updateSendPulseAccessToken()


    // router.all('/sendpulse/*', requestProxy({
    //     //cache: redis.createClient(),
    //     //cacheMaxAge: 3600,
    //     url: 'https://api.sendpulse.com/*',
    //     headers: {
    //         Authorization: `${access_object.token_type} ${access_object.access_token}`
    //     }
    // }));

    router.get('/ws/:url', (req, res, next) => {
        var url = req.params.url;
        var fname = `${url}.png`;
        var webshot = require('webshot');
        var userAgent = req.headers['user-agent'];
        console.log(userAgent, req.query.options);
        var options = _.extend({
             userAgent: userAgent
        }, req.query.options?JSON.parse(req.query.options):{});

        console.log('Capturing screenshot:', url, options);
        // stream the file
        var renderStream = webshot(url, options)
        , screenshot = '';
        
        // Capture the streaming output from the screenshot
        renderStream.on('data', function(data) {
            screenshot += data.toString('binary');
        });

        // Once the image capture is completed, write it out to the browser
        renderStream.on('end', function() {
            res.set('Content-Type', 'image/png');
            res.end(screenshot, 'binary');
        });
    });

    // Generic section
    router.get('/:section/:id', (req, res, next) => {
        var id = req.params.id
        , section = req.params.section;

        if(['css','img','media', 'js'].indexOf(section) > -1){
            next();
            return;
        }

        var md = {
        }, mkmd = {};
        if(fs.existsSync(`app/views/${section}/${id}.md`)){
            mkmd = new MarkedMetaData(`app/views/${section}/${id}.md`);
            try { 
                md = mkmd.metadata();
            }catch(e){
                console.log('No metadata found');
            }
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
