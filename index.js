var express = require('express'); //Import ExpressJS
var app = express(); //Server
var port = process.env.PORT || 8080; //Set port

//Parse all of the necessary data
function parseIt(headers) {
    //Create object to return at end of function
    var d = headers;

    var parsedObj = {
        'ipaddress': d['x-forwarded-for'], //IP address directly from header
        'language': '',
        'software': ''
    };
    
    //Parse langauge from correct header
    var pLang = d['accept-language'];
    pLang = pLang.slice(0, pLang.indexOf(','));
    parsedObj.language = pLang; //Assign to object
    
    //Parse software from correct header
    var pSoft = d['user-agent'];
    pSoft = pSoft.slice(pSoft.indexOf('(')+1,pSoft.indexOf(')'));
    parsedObj.software = pSoft; //Assign to object
    
    //Return complete object
    return parsedObj;
}


app.get('/', function(req, res) {
    //Parse data and display to visitor
   res.send(parseIt(req.headers));
});


app.listen(port, function() {
    console.log('Server is listening on port ' + port);
})