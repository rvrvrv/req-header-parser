var express = require('express'); //Import ExpressJS
var app = express(); //Server
var port = process.env.PORT || 8080; //Set port

app.get('/', function(req, res) {
   res.send('Hello World!');
});



app.listen(port, function() {
    console.log('Server is listening on port ' + port);
})