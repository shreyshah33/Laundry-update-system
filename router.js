const express = require('express');
const fs = require('fs')
const path = require('path')
const router_htm = require(__dirname + "/router.js")

// Create an express router 
var router = express.Router();


router.get('/', (req, res) => {
    res.sendFile(__dirname + '/page.htm');
});

// Adds a list
router.post('/', (req, res) => {
    let body = req.body;
    let name = body.name;
    let email = body.email;
    let number = body.number;
    let washer1 = body.washer1;
    let washer2 = body.washer2;
    let washer3 = body.washer3;
    let washer4 = body.washer4;
    let washer5 = body.washer5;
    let dryer6 = body.dryer6;
    let dryer7 = body.dryer7;
    let dryer8 = body.dryer8;
    let dryer9 = body.dryer9;
    let dryer10 = body.dryer10;
    let dryer11 = body.dryer11;
    let user = body.user;
    console.log(`
    Name: ${name}
    email: ${email}
    phone number: ${number}
    Washer 1: ${washer1}
    Washer 2: ${washer2}
    Washer 3: ${washer3}
    Washer 4: ${washer4}
    Washer 5: ${washer5}
    Dryer 6: ${dryer6}
    Dryer 7: ${dryer7}
    Dryer 8: ${dryer8}
    Dryer 9: ${dryer9}
    Dryer 10: ${dryer10}
    Dryer 11: ${dryer11}
    What are you using: ${user}`);

});

module.exports = router;