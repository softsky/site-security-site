module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "amd": true,
        "jquery": false
    },
    "globals": {
        "$"  : true,
        "_"  : true,
        "WOW": true,
        "jQuery": true        
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "no-path-concat": 0,
        "no-process-env": 0,
        "no-console": 0,
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};
