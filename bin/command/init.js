const fs = require('fs');
const readline = require('readline');

const util = require('../lib/util');

var json = {
    "basics": {
        "name": "Zz",
        "label": "Programmer",
        "picture": "",
        "email": "tears330@gmail.com",
        "phone": "(912) 555-4321",
        "website": "http://richardhendricks.com",
        "summary": "这里是简介",
        "location": {
            "address": "2712 Broadway St",
            "postalCode": "CA 94115",
            "city": "San Francisco",
            "countryCode": "US",
            "region": "California"
        },
        "profiles": [{
            "network": "Twitter",
            "username": "neutralthoughts",
            "url": ""
        }, {
            "network": "SoundCloud",
            "username": "dandymusicnl",
            "url": "https://soundcloud.com/dandymusicnl"
        }]
    }
};

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