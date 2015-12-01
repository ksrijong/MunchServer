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

  /*var errCheck = false;
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
      res.send((err === null) ? {msg: 'Successfully created Munch'} : {msg: 'error' + err});
    });
  }*/
  collection.insert(req.body, function(err, result) {
    res.send((err === null) ? {msg: 'Successfully created Munch'} : {msg: 'error' + err});
});

/* DELETE: delete a post */
router.delete('/deletemunch/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('munchcollection');
  var munchToDelete = req.params.id;

  collection.remove({ '_id' : munchToDelete }, function(err) {
    res.send((err === null) ? {msg: 'Successfully deleted Munch'} : {msg: 'error' + err});
  });

});

/* PUT: edit a post*/
/*router.put('/editmunch/:id', function(req,res) {
  console.log("Editing munch");
  var db = req.db;
  var collection = db.get('munchcollection');
  var munchToEdit = req.params.id;

  //collection.update( {'_id':munchToEdit}, {$set:{location: req.body.location }}, function(err) {
  collection.update( {'_id':munchToEdit},
                      { $set: {location: req.body.location}
                      },
                      function(err) {
    res.send((err === null) ? {msg: 'Successfully edited Munch'} : {msg: 'error' + err});
  });
});*/

module.exports = router;
