var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const dvds = require('../modules/DVDs');
const team= require('../modules/team');
const fs = require('fs');
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

router.post('/dvds/add', (request, response, next) => {
  var json = dvds.list();
  json.push(request.body);

  var data = JSON.stringify(json);
  
  fs.writeFileSync("./data/DVDsjson.json", data, (err) => {
    if (err) throw err;
    console.log("Added: " + data);
  });

  response.setHeader('content-type', 'application/json');
  response.end(data);
})

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

router.get('/dvds/team', (request, response, next) => {
  
  console.log('got into /dvds/team ');

 
  const result = team.query_team();
  if (result) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  } else {
    next(createError(404));
  }
});
module.exports = router;
