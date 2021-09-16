var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const food = require('../modules/food');
const url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Food' });
});

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

router.get('/food/teams', (request, response, next) => {
  
  console.log('got into /food/teams ');

  const result = team.query_teams();
  if (result) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  } else {
    next(createError(404));
  }
});

module.exports = router;


