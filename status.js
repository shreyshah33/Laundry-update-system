const express = require("express");
const fs = require("fs");
const path = require("path");
const Machine = require("./machine.js");
const rp = require("request-promise");
const cheerio = require("cheerio");
const cheerioTableParser = require('cheerio-tableparser');
const env = require('./.env');
require('dotenv').config();
const admin = require('firebase-admin');
const num = 12; //number of machines
const serviceAccount = require('./key');
const mailer = require("./mailer");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
let ref ={};
let oldStatus ={};
for(var i=1; i<num; i++){
    ref[i]=db.collection('status').doc(`Machine-${i}`);
}
for(var i=1; i<num; i++){
    var getDoc = ref[i].get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        oldStatus[i]=doc.data()['Status'];
        console.log(oldStatus[i]);
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
   
}


var batch = db.batch();  
const url= "https://www.laundryalert.com/cgi-bin/aggies/LMRoom?XallingPage=LMPage&Halls=8&PreviousHalls=&RoomPersistence=&MachinePersistenceA=&MachinePersistenceB=";
rp(url, function(error, response, html){

    if(!error){
        var $ = cheerio.load(html,{
            normalizeWhitespace: true,
            xmlMode: true
        });

        cheerioTableParser($);
        $('#tablea').filter(function(){
            let data=$(this).parsetable(true,true,true);
            let status={};
            for(var i = 1; i<num; i++){
                status[i]=(data[4][i+4]).toString();
            }
            console.log(status);
            for(var i = 1; i<num; i++){
                var name = "";
                var email = "";
                if(oldStatus[i]!=status[i]){
                    var getDoc = ref[i].get()
                    .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        name=doc.data()['Name'];
                        email=doc.data()['Email'];
                    }
                    })
                    .catch(err => {
                    console.log('Error getting document', err);
                    });
                    //mailer.sendEmail(email,name);
                    //batch.update(ref[i], {Name: "", Email: "", Number: ""});
                }
                batch.update(ref[i], {Status: status[i]});
            }
            return batch.commit().then(function () {});
        })
    }
    if(error){
        console.log(error);
    }
    
})