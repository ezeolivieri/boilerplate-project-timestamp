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


app.get("/api/:date?", (req, res) => {
  let result;
  let unixDate = req.params.date;
  let utcDate = new Date(req.params.date);

  // CHECK IF req.params.date IS EMPTY OR UNDEFINED
  // In that case it returns the current day
  if (!req.params.date) {
    const today = new Date();

    result = {
      unix: today.getTime(),
      utc: today.toUTCString()
    }
  } else {
    // CHECK IF req.params.date IS A VALID DATE FORMAT
    if (moment(parseInt(req.params.date)).isValid()){
      // CHECK IF utcDate IS A VALID DATE IN A FORMAT LIKE YYYY-MM-DD
      // In the ELSE case is because is a unix value
      if (utcDate.toString() != "Invalid Date") {
        unixDate = Math.floor( utcDate.getTime() );
      } else {
        utcDate = new Date(moment(unixDate * 1).toDate());
      }

      result = { 
        unix: parseInt(unixDate), 
        utc: utcDate.toUTCString() 
      }
    } else {
      result = { error: "Invalid Date" }
    }
  }

  // RETURN THE RESULT
  res.json(result)
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});




// 1st. {"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
// 2nd. {"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
// 3rd. 