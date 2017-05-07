'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var readLine = require('readline');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var data = process.env.dataSource || '/Users/Edxe/gps.track.log';

var lineReader = readLine.createInterface({input: fs.createReadStream(data)});

var lineCount = 0;
var lineContent = undefined;
var port = process.env.PORT || 1044;        // set our port
var router = express.Router();

router.get('/feed', function (req, res) {
    lineReader.resume();
    res.json(lineContent);

});

lineReader.on('line', function (line) {
    console.log(lineCount++);
    lineContent = line;
    lineReader.pause();
});

lineReader.on('close', function () {
    console.log("end items");
    lineContent = '{"msg":"no more items"}'
});



// START THE SERVER
// =============================================================================
app.use('/gps-feed', router);
app.listen(port);
console.log('Magic happens on port ' + port);



