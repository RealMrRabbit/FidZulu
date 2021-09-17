const createError = require('http-errors');
const express = require('express');
const router = express.Router();

const toys=require('../modules/toys');
const names=require('../modules/names');
const url =require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Toys BackEnd Service'});
});

router.get('/toys/all/:location', (request, response, next) => {
  let data;
  let param = request.params.location;
  if (param == 'durham') {
    data = toys.calcTax(0.08);
  } else if (param == 'raleigh') {
    data = toys.calcTax(0.075);
  } else {
    next(createError(400));
  }
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(data));
});

 router.get('/toys/team', (request, response, next) => {
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

 router.post('/toys/add', (request, response, next) => {
  let name = request.body.name;
  let brand = request.body.brand;
  let ages = request.body['age-group'];
  let prize = request.body.prize;

  let newData = {
    "name": name,
    "brand": brand,
    "age-group": ages,
    "prize": prize
  }
  try {
    
    toys.addData(newData);
    response.setHeader('content-type', 'application/json');
    response.send('Added a toy');
    
  } catch (err) {
    console.log("Caught exception.");
    response.status(500).send('Something broke!');
  }

});

module.exports = router;
