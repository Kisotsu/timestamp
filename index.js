// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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
  let unix;
  let utc;
  switch(req.params.date){
    case undefined:
      utc = new Date().toUTCString()
      unix = Date.now()
      res.json({unix: unix,utc: utc})
    default:
      console.log(new Date("05 October 2011, GMT"))
      if(req.params.date === undefined) {
        return
      } else {
        if(new Date(req.params.date) !== "Invalid Date" && isNaN(req.params.date)) {
          console.log("ninoeeeee")
          unix = Date.parse(req.params.date)
          utc = new Date(unix * 1).toUTCString()
        } else if(req.params.date.length >= 13 || req.params.date.length < 4) {
          unix = Number(req.params.date)
          utc = new Date(unix * 1).toUTCString()
         
        } else {
          console.log("ninoe")
          unix = Date.parse(req.params.date)
          utc = new Date(unix * 1).toUTCString()
         
        }
        if(utc === "Invalid Date") {
          res.json({error: "Invalid Date"})
        } else {
          res.json({unix,utc})
  
        }
      }
    
  }
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
