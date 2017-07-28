const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.port || 3001;

const routes = require('./api/routes/index-route');

app.listen(port);
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);


console.log('user management system RESTful API server started on: ' + port);
