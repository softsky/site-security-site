#!/usr/bin/env node

var https = require('https'),
    fs = require('fs'),
    AdmZip = require('adm-zip'),
    request = require('request'),
    prompt = require('prompt'),
    util = require('util'),
    beautify = require('js-beautify').js_beautify

prompt.message = ''
prompt.delimiter = ''

prompt.start()

prompt.get({
    properties: {
        name: {
            description: 'Project Name:',
            required: true,
            message: 'Project Name is required. Please input Project Name.'
        },
        description: {
            description: 'Description:'
        },
        version: {
            description: 'Version:',
            pattern: /^\d[0-9\\.]+\d$/,
            message: 'The version only accept digit and dot like 0.0.1 or 1.0.5'
        },
        author: {
            description: 'Author:'
        },
        repository: {
            description: 'Repository:'
        }
    }
}, function(err, rs) {
    var out = fs.createWriteStream('tmp.zip')
    var req = request('https://codeload.github.com/ALT-F1/bootstrap3-jade-node-express-grunt/zip/master')
    req.pipe(out)
    req.on('end', function() {
        var zip = new AdmZip('tmp.zip')
        zip.extractAllTo('', true)
        fs.rename('bootstrap3-jade-node-express-grunt-master', rs.name, function() {
            fs.readFile('./'+rs.name+'/package.json', 'utf8', function(err, data) {
                if (err) throw err
                var pkg = JSON.parse(data)
                rs.dependencies = pkg.dependencies
                rs.devDependencies = pkg.devDependencies
                fs.writeFile('./'+rs.name+'/package.json', beautify(JSON.stringify(rs), {
                    indent_size: 2
                }), function(err) {
                    if (err) throw err
                    console.log('Done')
                })
            })
        })
    })
})