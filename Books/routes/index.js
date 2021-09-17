var express = require('express');
const createError = require("http-errors");
var fs = require('fs');
var router = express.Router();
var booksData = require('../modules/bookData');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function calcTax(tax) {
  let data = booksData.list();
  for (let i = 0; i < data.length; ++i) {
    let addedTax = data[i].price * tax;
    data[i].price = parseFloat((data[i].price + addedTax).toFixed(2));
  }
  return data;
}

router.get('/books/all/:location', (request, response, next) => {
  let data;
  let param = request.params.location;
  if (param == 'raleigh') {
    data = calcTax(0.075);
  } else if (param == 'durham') {
    data = calcTax(0.08);
  } else {
    next(createError(400));
  }
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(data));
})

router.get('/books/team', (request, response, next) => {
  let team = '{ "team" : "Team 1", "membersNames" : [ "Aidan Lee", "Byron Martinez", "Connor Renquin", "Noor Helbaoui" ] }';
  const ret = JSON.parse(team);
  response.send(ret);
})

router.post('/books/add', (request, response, next) => {
  var json = booksData.list();
  json.push(request.body);

  var data = JSON.stringify(json);
  
  fs.writeFileSync("./data/books-data.json", data, (err) => {
    if (err) throw err;
    console.log("Added: " + data);
  });

  response.setHeader('content-type', 'application/json');
  response.end(data);
})

module.exports = router;
