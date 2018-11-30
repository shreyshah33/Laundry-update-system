const nodemailer = require('nodemailer');
const env = require('./.env')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

/**
 * Send email to recipients with a message.
 * @param {[String]} recipients List of emails
 * @param {String} subject Subject field of message
 * @param {String} message Message to send
 */
module.exports.sendEmail = async (recipient, name) => {
    //Setting emailing options
    const mailOptions = {
        from: `${process.env.EMAIL_USERNAME}`, 
        to: `${recipient}`, 
        subject: `Laundry Done!`, 
        text: `Howdy ${name},\n Your Laundry is done! Please pick it up. \n Haas Laundry Management System`
    };
    
    //sending the email
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
        console.log(err.code); // displaying only the error code
    });
}