var express= require('express');
var app= express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var db = mongojs('organization', ['organization']);

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.get('/organization', function(req, res){
	db.organization.find(function(err, docs){
		res.json(docs);
	});

});

app.post('/organization', function(req, res){
	db.organization.insert(req.body, function(err, docs){
		res.json(docs);
	});
});

app.delete('/organization/:id', function(req, res){
	var id = req.params.id;
	db.organization.remove({_id: mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});
});

app.get('/organization/:id', function(req, res){
	var id = req.params.id;
	db.organization.findOne({_id: mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});
});

app.put('/organization/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.organization.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {email: req.body.email, name: req.body.name, dob: req.body.dob, gender: req.body.gender, department: req.body.department, age: req.body.age}},
		new: true}, function(err, doc){
			res.json(doc);
		});

	
});

app.listen(7777);
console.log("Server running on port 7777");






