var webpack = require("webpack");
var path = require('path');

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    watch: true,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            }
        ],
    },
    externals: {
        "jquery": "jQuery",
        "moment": "moment",
        "numeral": "numeral",
        "vue": "Vue",

        // Include createjs script on your page, then add the below.
        // The left hand side represents the global module that gets exposed to your ES6 code
        // The right hand side represents the object that is exposed/imported from your externally referenced script.

        "createjs": "createjs"
    },

  };