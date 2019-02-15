const express = require("express");
const fs = require("fs");
const path = require("path");
const Machine = require("./machine.js");
const rp = require("request-promise");
const cheerio = require("cheerio");
const cheerioTableParser = require('cheerio-tableparser');
const admin = require('firebase-admin');
const num = 12; //number of machines
const serviceAccount = require('./key');
const mailer = require("./mailer");
const env = require('./.env');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
let ref ={};
let oldStatus ={};
let status ={};
var batch = db.batch();  
const url= "https://www.laundryalert.com/cgi-bin/aggies/LMRoom?XallingPage=LMPage&Halls=8&PreviousHalls=&RoomPersistence=&MachinePersistenceA=&MachinePersistenceB=";


async function getReference(){
    try{
        for(var i=1; i<num; i++){
            ref[i]=await db.collection('status').doc(`Machine-${i}`);
        }
    } catch (error){
        console.error(error);
    }
    return ref;
}

async function getOldStatus(){
    var ref= await getReference();
    for(var i=1; i<num; i++){
        try {
            let doc = await ref[i].get()
            if(!doc.exists) {
            console.log('No such document!')
            } else {
            oldStatus[i] = doc.data()['Status']
            }
        } catch(err) {
        console.log('Error getting document', err)
        }
    }
    // console.log(oldStatus);
    return oldStatus;
}

async function getStatus(){
    await rp(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html,{
                normalizeWhitespace: true,
                xmlMode: true
            });
    
            cheerioTableParser($);
            $('#tablea').filter(function(){
                let data=$(this).parsetable(true,true,true);
                for(var i = 1; i<num; i++){
                    status[i]= (data[4][i+4]).toString();
                }
                // for(var i =1; i<num; i++){console.log(status[i]);}
            })
        }
        if(error){
            console.log(error);
        }
        
    })

    return status;
}

async function checkUpdate(){
    var oldStatus = await getOldStatus();
    var status = await getStatus();
    var ref = await getReference();
    for(var i = 1; i<num; i++){
        var name = "";
        var email = "";
        // console.log(oldStatus[i]+" "+status[i])

        if(oldStatus[i]!=status[i]){
            let doc = await ref[i].get()
            if(!doc.exists) {
            console.log('No such document!')
            } else {
                name=doc.data()['Name'];
                email=doc.data()['Email'];
                if(email!=""){
                    mailer.sendEmail(email,name);
                }
                console.log("sending email to "+name+"at "+email);    
                
                batch.update(ref[i], {Name: "", Email: "", Number: ""});
            }
        }
       batch.update(ref[i], {Status: status[i]});
    //    console.log(status[i]+" "+oldStatus[i]);
    }
     
    return batch.commit().then(function () {console.log("updated stuff")});
}

checkUpdate();
// getStatus();