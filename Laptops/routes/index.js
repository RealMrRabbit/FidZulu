const createError = require('http-errors');
const express = require('express');
const router = express.Router();

const laptops=require('../modules/laptops');
const url =require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Laptop BackEnd Service'});
});

router.get('/laptops', (request, response, next) => {
  let get_params = url.parse(request.url, true).query;
  console.log('Processing laptops');
  if (Object.keys(get_params).length == 0) {
  console.log('no params');
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(laptops.list()));
  } else {
  // get first parameter only
  let key = Object.keys(get_params)[0];
  console.log("First key is: " + key);
  let value = request.query[key];
  console.log('params ' + value);
  let result = laptops.query_by_arg(key, value);
  if (result) {
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(result));
  } else {
  next(createError(404));
  }
  }
 });

module.exports = router;
