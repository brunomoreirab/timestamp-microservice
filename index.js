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

app.get("/api", (req, res) => {
  // Busca a hora atual
  let input_date_format = new Date()

  response_obj = {
    unix: input_date_format.valueOf(), 
    utc: input_date_format.toGMTString()}

  // Retorna o objeto
  res.json(response_obj)
})

app.get("/api/:date", (req, res) => {
  let input = req.params.date;
  let response_obj = {}
  console.log(input)
  // input.match(/^\d{4}-\d{2}-\d{2}$/)
  // Verifica se é apenas número (UNIX) para converter a string para number
  if(input.match(/^-?\d+$/)){
    input = +input;
  }

  // Converte para formato de data
  let input_date_format = new Date(input);

  // Verifica se o formato é válido ou não, e constrói o objeto de resposta
  if (input_date_format == 'Invalid Date') {
    response_obj = {
      error: "Invalid Date"}
  }

  else {
    response_obj = {
      unix: input_date_format.valueOf(), 
      utc: input_date_format.toGMTString()}
  }

  // Retorna o objeto
  res.json(response_obj)
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
