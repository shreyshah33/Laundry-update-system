const mailer = require("./mailer.js");
'use strict';
class Machine{
    
    constructor(status= "Empty", name = "", number="", email = ""){
        this.status = status;
        this.name=name;
        this.email = email;
        this.number = number;
    }

    /**
     * Set Status.
     * 
     * @param {string} newStatus- Status
     */
   setStatus(newStatus){
        this.status = newStatus;
    }
    userMachine(userName, userEmail, userNumber=''){
        this.name = userName;
        this.email = userEmail;
        this.userNumber = userNumber;
    }
    getStatus(){
        return this.status;
    }
    sendEmail(){
        console.log("email sent!");
        mailer.sendEmail(this.email, this.name);
        this.name = "";
        this.email="";
        this.number="";

    }
}

module.exports = Machine;
