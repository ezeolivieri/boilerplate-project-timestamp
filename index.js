// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

const moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:time", (req, res) => {
  let unixDate = req.params.time;
  let utcDate = new Date(req.params.time);

  if (utcDate.toString() != "Invalid Date") {
    unixDate = Math.floor( utcDate.getTime() );
  } else {
    utcDate = new Date(moment(unixDate * 1).toDate());
  }

  res.json({ 
    unix: parseInt(unixDate), 
    utc: utcDate.toUTCString() 
  })
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
