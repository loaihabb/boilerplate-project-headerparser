// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Mount middleware to extract client information from request headers
app.use((req, res, next) => {
  const clientIP = req.ip;
  const preferredLanguage = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  req.clientInfo = {
    ipaddress: clientIP,
    language: preferredLanguage,
    software: software
  };
  next();
});

// Define the /api/whoami endpoint
app.get('/api/whoami', (req, res) => {
  const clientInfo = req.clientInfo;
  res.json(clientInfo);
});

// your first API endpoint...
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
