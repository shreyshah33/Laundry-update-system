const express = require("express");
const fs = require("fs");
const path = require("path");
const Machine = require("./machine.js");

// Create an express router 
var router = express.Router();

var machines = {}
for(let i = 1;i<=11;i++) {
    machines[i] = new Machine()
}

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/page.html');
});

router.post('/', (req, res) => {
    let body = req.body;
    let name = body.name;
    let email = body.email;
    let number = body.number;
    let status = {};
    status[1] = body.Machine1;
    status[2] = body.Machine2;
    status[3] = body.Machine3;
    status[4] = body.Machine4;
    status[5] = body.Machine5;
    status[6] = body.Machine6;
    status[7] = body.Machine7;
    status[8] = body.Machine8;
    status[9] = body.Machine9;
    status[10] = body.Machine10;
    status[11] = body.Machine11;
    let user = body.user;
    for(let i = 1; i<=11; i++){
        machines[i].setStatus(status[i]);
        if(user==i){
            machines[i].userMachine(name, email, number);
            }
        if(machines[i].getStatus()=="Done"){
            machines[i].sendEmail();
        }
    }
    res.send(`<h1>Thank You</h1>`);
});

router.get('/status', (req, res) => {
    let data = "";
    for(let i = 1; i<=11; i++){
        data = data + "Washer/Dryer" + i + ": " + machines[i].getStatus() + "<br>"
    }
    res.send(
        `<h3>${data}</h3>`
    );
});
module.exports = router;