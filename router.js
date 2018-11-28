const express = require('express');
const fs = require('fs')
const path = require('path')

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
    console.log(`Name: ${req}\n email: ${email} \n phone number: ${number} \n`);
});

module.exports = router;