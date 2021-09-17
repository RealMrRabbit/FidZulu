var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const food = require('../modules/food');
const team = require('../modules/teams');
const fs = require('fs');
const url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Food' });
});

router.post('/food/add', (request, response, next) => {
  var json = food.list();
  json.push(request.body);

  var data = JSON.stringify(json);
  
  fs.writeFileSync("./data/Foodjson.json", data, (err) => {
    if (err) throw err;
    console.log("Added: " + data);
  });

  response.setHeader('content-type', 'application/json');
  response.end(data);
})

router.get('/food/all/:location', (request, response, next) => {
  const param = request.params.location;
  console.log('got into food/title/:location ' + param);

  const result = food.query_all(
    "location", param);
  if (result) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  } else {
    next(createError(404));
  }
})

router.get('/food/name/:name', (request, response, next) => {
  const param = request.params.name;
  console.log('got into food/name/:name ' + param);

  const result = food.query_by_arg(
    "name", param);
  if (result) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  } else {
    next(createError(404));
  }
});

router.get('/food/team', (request, response, next) => {
  
  console.log('got into /food/team ');

  const result = team.query_team();
  if (result) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  } else {
    next(createError(404));
  }
});

module.exports = router;


