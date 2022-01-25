require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');

var users = require('./routes/user.route.js');
const logger = require('./middlewares/logger.middleware.js');

const app = express();
const port = 7050;

app.use(bodyparser.json());

app.use(logger);

app.use('/', users);

app.listen(port, () => {
	console.log(`Example app listening on ${port}`);
});