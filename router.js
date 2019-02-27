const express = require("express");
const fs = require("fs");
const path = require("path");
const status = require('./status.js');
const admin = require('firebase-admin');
const serviceAccount = require('./key');

// Create an express router 
var router = express.Router();


router.get('/', (req, res) => {
    res.sendFile(__dirname + '/page.html');
});

router.post('/', (req, res) => {
    let body = req.body;
    let name = body.name;
    let email = body.email;
    let number = body.number;
    let user = body.user;
    if(user!=0) status.updateData(user,name,email,number);
    res.send(`<h1>Thank You</h1>`);
});

router.get('/status', (req, res) => {
    let oldStatus = [];
    async function print(){
        oldStatus = await status.getStatus();
        var printStmt = "";
        for(var i=1; i<12; i++){
            printStmt+=`<h3>Machine-${i} - ${oldStatus[i]}</h3>`
        }
        res.send(
            `${printStmt}`
        );
    }
    print()    
});

router.get('/cron', (req, res) => {
    status.checkUpdate();
});
module.exports = router;