const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const fs = require('fs');

const laptops=require('../modules/laptops');
const names=require('../modules/names');
const url =require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Laptop BackEnd Service'});
});

router.post('/laptops/add', (request, response, next) => {
  var json = laptops.list();
  json.push(request.body);

  var data = JSON.stringify(json);
  
  fs.writeFileSync("./data/laptops.json", data, (err) => {
    if (err) throw err;
    console.log("Added: " + data);
  });

  response.setHeader('content-type', 'application/json');
  response.end(data);
})

router.get('/laptops/all/:location', (request, response, next) => {
  let data;
  let param = request.params.location;
  if (param == 'durham') {
    data = laptops.calcTax(0.08);
  } else if (param == 'raleigh') {
    data = laptops.calcTax(0.075);
  } else {
    next(createError(400));
  }
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(data));
});

 router.get('/laptops/team', (request, response, next) => {
  let get_params = url.parse(request.url, true).query;
  console.log('Processing names');
  if (Object.keys(get_params).length == 0) {
  console.log('no params');
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(names.list()));
  } else {
  // get first parameter only
  let key = Object.keys(get_params)[0];
  console.log("First key is: " + key);
  let value = request.query[key];
  console.log('params ' + value);
  let result = names.query_by_arg(key, value);
  if (result) {
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(result));
  } else {
  next(createError(404));
  }
  }
 });

module.exports = router;
