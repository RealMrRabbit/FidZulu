const createError = require('http-errors');
const express = require('express');
const router = express.Router();

const laptops = require('../modules/laptops');
const names = require('../modules/names');
const url = require('url');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Laptop BackEnd Service' });
});

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

router.post('/laptops/add', (request, response, next) => {
  console.log(request.body)

  let product = request.body.product;
  let brand = request.body.brand;
  let cpu = request.body.CPU;
  let memory = request.body.memory;
  let price = request.body.price;

  let newData = {
    "product": product,
    "brand": brand,
    "CPU": cpu,
    "memory": memory,
    "price": price
  }
  try {
    laptops.addData(newData);

    response.send('Added a laptop')
  } catch (err) {
    console.log("Caught exception.");
    response.status(500).send('Something broke!');
  }


});


module.exports = router;
