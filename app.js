const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const cron = require("node-cron");
const status = require("./status.js"); 

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',router);

const server = app.listen(8080, () => {
	console.log(`API is running at http://localhost:8080`)
});

cron.schedule("* * * * *", function(){status.checkUpdate()});
// cron.schedule("* * * * *", function() {
// 	console.log("running a task every minute");
//   });