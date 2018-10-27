import {resolve} from 'path'
import fs from 'fs'

function lsjs(dir){
    return dir, fs.readdirSync(dir).filter((file) => file.endsWith('.js')).map((it) => resolve(dir, it))
}

module.exports = {
    entry: [
        'bootstrap',
        'jquery',
        ...lsjs('./app/public/js/'),
        ...lsjs('./app/public/js/assets/'),
    ],
    output: {
        filename: 'bundle.min.js',
        path: resolve(__dirname, 'dist')
    }
}
