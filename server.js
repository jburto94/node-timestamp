var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  let date;
  //if param is null, get current date
  if (!req.params.date_string) {
    date = new Date();
  } else {
    date = req.params.date_string;
  }
  
  //if param is a unix timestamp and if so convert to integer
  const isNum = /^-?\d+$/;
  if(isNum.test(date)) {
    date = parseInt(date);
  }
  
  const fullDate = new Date(date);
  const unix = fullDate.getTime();
  const utc = fullDate.toUTCString();
  if(unix) {
    res.json({
      "unix": unix,
      "utc": utc
    });
  } else {
    res.json({"error": "Invalid Date"});
  }
});

var listener = app.listen(3000, function () {
  console.log('Your app is listening on port 3000');
});