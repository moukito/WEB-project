/* global require module */
require('@babel/register')({
    extensions: ['.jsx', '.js']
});

module.exports = require('./server/index.js');