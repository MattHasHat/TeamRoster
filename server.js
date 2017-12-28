var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('teamroster', ['teamroster']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/teamroster', function (req, res) {
	console.log('Receiving Request');
	db.playerroster.find(function (err, docs) {
    	console.log(docs);
    	res.json(docs);
  	});
});

app.post('/teamroster', function (req, res) {
	console.log(req.body);
	db.playerroster.insert(req.body, function(err, doc) {
    	res.json(doc);
  	});
});

app.delete('/teamroster/:id', function (req, res) {
	var id = req.params.id;
  	console.log(id);
  	db.playerroster.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    	res.json(doc);
  	});
});

app.get('/teamroster/:id', function (req, res) {
	var id = req.params.id;
  	console.log(id);
  	db.playerroster.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
    	res.json(doc);
  	});
});

app.put('/teamroster/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.name);
  	db.playerroster.findAndModify({
    	query: {_id: mongojs.ObjectId(id)},
    	update: {$set: {name: req.body.name, number: req.body.number, position: req.body.position}}, new: true}, function(err, doc) {
      		res.json(doc);
    	}
  	);
});

app.listen(3000);
console.log("Server Running On Port 3000");