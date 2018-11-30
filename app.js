const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();

app.use(bodyParser.urlencoded());

app.use('/',router);

const server = app.listen(8080, () => {
	console.log(`API is running at http://localhost:8080`)
});