var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log("Hello");
});

/* GET Hello World page */
router.get('/helloworld', function(req,res) {
  res.render('helloworld', {title:'Hello, World!'});
});

/* GET Munch Posts page */
router.get('/getmunchlist', function(req,res) {
  console.log("Getting munch list");
  var db = req.db;
  var collection = db.get('munchcollection');
  collection.find({},{},function(e,docs){
    res.json({"munchlist" : docs});
  });
});

/* POST to munchlist */
router.post('/munchlist', function(req,res) {
  console.log("Creating munch");
  var db = req.db;
  //console.log(req.body);
  var collection = db.get('munchcollection');

  var errCheck = false;
  var errorMsg = "";
  if(!req.body.hasOwnProperty('location')){
    errorMsg = "Missing location";
    errCheck = true;
    res.send({msg: errorMsg});
  }
  if( (req.body.location == "" ) || (req.body.location == " ") ){
    errorMsg = "Requires a location";
    errCheck = true;
    res.send({msg: errorMsg});
  }
  else {
    collection.insert(req.body, function(err, result) {

    res.send(
      (err === null) ? {msg: 'Successfully created Munch'} : {msg: err}
      );
  });
}
});

/*
 *
 */

module.exports = router;
