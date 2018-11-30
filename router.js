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
    console.log("form submitted");
    machines[1].setStatus(washer1);
    machines[2].setStatus(washer2);
    machines[3].setStatus(washer3);
    machines[4].setStatus(washer4);
    machines[5].setStatus(washer5);
    machines[6].setStatus(dryer6);
    machines[7].setStatus(dryer7);
    machines[8].setStatus(dryer8);
    machines[9].setStatus(dryer9);
    machines[10].setStatus(dryer10);
    machines[11].setStatus(dryer11);
    switch(user){
        case "0":
            break;
        case "1":
            machines[1].userMachine(name, email, number);
            console.log("email set");
            break;
        case "2":
            machines[2].userMachine(name, email, number);
            break;
        case 3:
            machines[3].userMachine(name, email, number);
            break;
        case 4:
            machines[4].userMachine(name, email, number);
            break;
        case 5:
            machines[5].userMachine(name, email, number);
            break;
        case 6:
            machines[6].userMachine(name, email, number);
            break;
        case 7:
            machines[7].userMachine(name, email, number);
            break;
        case 8:
            machines[8].userMachine(name, email, number);
            break;
        case 9:
            machines[9].userMachine(name, email, number);
            break;
        case 10:
            machines[10].userMachine(name, email, number);
            break;
        case 11:
            machines[11].userMachine(name, email, number);
            break;
    }
   
    if(machines[1].getStatus()=="Done"){
        machines[1].sendEmail();
    }
    if(machines[2]=="Done"){
        machines[2].sendEmail();
    }
    if(machines[3]=="Done"){
        machines[3].sendEmail();
    }
    if(machines[4]=="Done"){
        machines[4].sendEmail();
    }
    if(machines[5]=="Done"){
        machines[5].sendEmail();
    }
    if(machines[6]=="Done"){
        machines[6].sendEmail();
    }
    if(machines[7]=="Done"){
        machines[7].sendEmail();
    }
    if(machines[8]=="Done"){
        machines[8].sendEmail();
    }
    if(machines[9]=="Done"){
        machines[9].sendEmail();
    }
    if(machines[10]=="Done"){
        machines[10].sendEmail();
    }
    if(machines[11]=="Done"){
        machines[11].sendEmail();
    }

    res.send(`Thank You`);
});

router.get('/status', (req, res) => {
    res.send(
        `Washer1: ${machines[1].getStatus()}<br>
         Washer2: ${machines[2].getStatus()}<br>
         Washer3: ${machines[3].getStatus()}<br>
         Washer4: ${machines[4].getStatus()}<br>
         Washer5: ${machines[5].getStatus()}<br>
         Dryer6: ${machines[6].getStatus()}<br>
         Dryer7: ${machines[7].getStatus()}<br>
         Dryer8: ${machines[8].getStatus()}<br>
         Dryer9: ${machines[9].getStatus()}<br>
         Dryer10: ${machines[10].getStatus()}<br>
         Dryer11: ${machines[11].getStatus()}<br>`
    );
});
module.exports = router;