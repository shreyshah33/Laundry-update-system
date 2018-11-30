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
    done(){
        mailer.sendEmail(this.email, this.name);
    }
}
/**
 * Set Status.
 * 
 * @param {string} newStatus- Status
*/
module.exports = Machine;
//module.exports.Machine.setStatus(newStatus);
