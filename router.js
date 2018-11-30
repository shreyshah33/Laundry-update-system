const express = require("express");
const fs = require("fs");
const path = require("path");
const Machine = require("./machine.js");

const machine = new Machine();
console.log(machine.getStatus());
// Create an express router 
var router = express.Router();

let m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11 = new Machine();
m1.setStatus("Empty");
// m2.setStatus("Empty");
// m3.setStatus("Empty");
// m4.setStatus("Empty");
// m5.setStatus("Empty");
// m6.setStatus("Empty");
// m7.setStatus("Empty");
// m8.setStatus("Empty");
// m9.setStatus("Empty");
// m10.setStatus("Empty");
// m11.setStatus("Empty");

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
    m1.status(washer1);
    m2.setStatus(washer2);
    m3.setStatus(washer3);
    m4.setStatus(washer4);
    m5.setStatus(washer5);
    m6.setStatus(dryer6);
    m7.setStatus(dryer7);
    m8.setStatus(dryer8);
    m9.setStatus(dryer9);
    m10.setStatus(dryer10);
    m11.setStatus(dryer11);
    switch(user){
        case none:
            break;
        case 1:
            m1.userMachine(name, email, number);
            break;
        case 2:
            m2.userMachine(name, email, number);
            break;
        case 3:
            m3.userMachine(name, email, number);
            break;
        case 4:
            m4.userMachine(name, email, number);
            break;
        case 5:
            m5.userMachine(name, email, number);
            break;
        case 6:
            m6.userMachine(name, email, number);
            break;
        case 7:
            m7.userMachine(name, email, number);
            break;
        case 8:
            m8.userMachine(name, email, number);
            break;
        case 9:
            m9.userMachine(name, email, number);
            break;
        case 10:
            m10.userMachine(name, email, number);
            break;
        case 11:
            m11.userMachine(name, email, number);
            break;
    }
    if(washer1=="done"){
        m1.sendEmail();
    }
    if(washer2=="done"){
        m2.sendEmail();
    }
    if(washer3=="done"){
        m3.sendEmail();
    }
    if(washer4=="done"){
        m4.sendEmail();
    }
    if(washer5=="done"){
        m5.sendEmail();
    }
    if(dryer6=="done"){
        m6.sendEmail();
    }
    if(dryer7=="done"){
        m7.sendEmail();
    }
    if(dryer8=="done"){
        m8.sendEmail();
    }
    if(dryer9=="done"){
        m9.sendEmail();
    }
    if(dryer10=="done"){
        m10.sendEmail();
    }
    if(dryer11=="done"){
        m11.sendEmail();
    }

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
    res.send(`Thank You`);
});

router.get('/status', (req, res) => {
    res.send(
        `Washer1: ${m1.getStatus()}
         Washer2: ${m2.getStatus()}
         Washer3: ${m3.getStatus()}
         Washer4: ${m4.getStatus()}
         Washer5: ${m5.getStatus()}
         Dryer6: ${m6.getStatus()}
         Dryer7: ${m7.getStatus()}
         Dryer8: ${m8.getStatus()}
         Dryer9: ${m9.getStatus()}
         Dryer10: ${m10.getStatus()}
         Dryer11: ${m11.getStatus()}`
    );
});
module.exports = router;