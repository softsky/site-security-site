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
, marked = require('marked')
, MarkedMetaData = require('marked-metadata')
, hljs = require('highlight.js')
, seneca = require('seneca')()
    .client({
	type: 'http',
	port: '3000',
	host: 'localhost',
	protocol: 'http'
    })
    .act('role:entity,cmd:list',{name:'ww','q.host':/.*t.*/}, console.log);

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
	seneca.act({role:'web', cmd:'list', name:'ww', 'q.id':req.params.id}, function (err, msg){
            res.render('bootstrap3-templates/dashboard', _.extend({
		'pathToAssets': '/bootstrap-3.3.1',
		'pathToSelectedTemplateWithinBootstrap' : '/bootstrap-3.3.1/docs/examples/dashboard'
            }, msg));
	});
    });
    // Generic section
    router.get('/:section/:id', (req, res, next) => {
	var id = req.params.id
	, section = req.params.section;
	
	if(['css','img'].indexOf(section) > -1){
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
