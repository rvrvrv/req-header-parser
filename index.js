const express = require('express'); // Import ExpressJS
const app = express(); // Server
const port = process.env.PORT || 8080; // Set port

// Parse all of the necessary data
function parseIt(headers) {
  // Create object to return at end of function
  const h = headers;

  const parsedObj = {
    ipAddress: h['x-forwarded-for'], // IP address directly from header
    language: '',
    software: '',
  };

  // Parse language from correct header
  let pLang = h['accept-language'];
  pLang = pLang.slice(0, pLang.indexOf(','));
  parsedObj.language = pLang; // Assign to object

  // Parse software from correct header
  let pSoft = h['user-agent'];
  pSoft = pSoft.slice(pSoft.indexOf('(') + 1, pSoft.indexOf(')'));
  parsedObj.software = pSoft; // Assign to object

  // Return complete object
  return parsedObj;
}

app.get('/', (req, res) => {
  // Parse data and display to visitor
  res.send(parseIt(req.headers));
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
