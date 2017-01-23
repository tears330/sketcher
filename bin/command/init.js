const fs = require('fs');
const readline = require('readline');

const util = require('../lib/util');

var json = require('../lib/resume');

const init = () => {
    util.questionSync('Name:')
        .then((answer) => {
            json.basics.name = answer;
            return util.questionSync('Email:');
        })
        .then((answer) => {
            json.basics.email = answer;
            return util.writeFile('/resume.json', JSON.stringify(json, undefined, 2));
        })
        .then((data) => {
            console.log('Checkout your resume.json!')
        })
};


module.exports = init;