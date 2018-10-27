'use latest'

import express from 'express'
import _ from 'lodash'
import url from 'url'
import fs from 'fs'
import {resolve} from 'path'
import dotenv from 'dotenv'
import proxy from 'express-http-proxy'


module.exports = (function () {
    var router = express.Router()

    router.use('/api/whatweb', proxy('whatweb.net', {
        //reqAsBuffer: true,
        decorateRequest: function(proxyReq, originalReq) {
            // you can update headers
            proxyReq.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            // you can change the method
            proxyReq.method = 'POST'
            // you can munge the bodyContent.
            //console.log(originalReq.body.target || originalReq.query.target)
            proxyReq.bodyContent = 'target=' + (originalReq.body.target || originalReq.query.target)
            return proxyReq
        },
        forwardPath: (req, res) => {
            return '/whatweb.php'
        }
    }))

    router.use('/api/whois', proxy('dns.com.ua', {
        decorateRequest: function(proxyReq, originalReq) {
            // you can update headers
            proxyReq.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            // you can change the method
            proxyReq.method = 'POST'
            // you can munge the bodyContent.
            //console.log(originalReq.body.domain || originalReq.query.domain)
            proxyReq.bodyContent = 'domain=' + (originalReq.body.domain || originalReq.query.domain)
            return proxyReq
        },
        forwardPath: (req, res) => {
            return '/ajax/whois?domain=' + (req.body.domain || req.query.domain)
        }
    }))

    // router.use('/api', proxy(`http://${hostname}:${port}`, {
    //     forwardPath: function(req, res) {
    //         return '/api' + url.parse(req.url).path
    //     }
    // }))
    return router
})()
