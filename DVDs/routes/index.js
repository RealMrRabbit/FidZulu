var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const dvds = require('../modules/DVDs');
const team= require('../modules/team')
const url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// can process any existing query paramters (e.g.:?firstname=John)
router.get('/dvds/all/:location', (request, response, next) => {
  const param = request.params.location;
  console.log('got into dvd/all/:location ' + param);

 
  const result = dvds.query_all(
    "location", param);
  if (result) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  } else {
    next(createError(404));
  }
});

router.get('/dvd/title/:title', (request, response, next) => {
  const param = request.params.title;
  console.log('got into dvd/title/:title ' + param);

 

  const result = dvds.query_by_arg(
    "title", param);
  if (result) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  } else {
    next(createError(404));
  }
});

router.get('/dvds/teams', (request, response, next) => {
  
  console.log('got into /dvds/teams ');

 
  const result = team.query_teams();
  if (result) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  } else {
    next(createError(404));
  }
});
module.exports = router;
