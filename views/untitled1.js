$scope.birth= [];
  		
  		$scope.birth.push(bday);
  		console.log($scope.bday);




var app = angular.module('birthdayApp',[]);
app.controller('birtdayController',function($scope,$http){
	$scope.sendmail =function(birth){
			console.log('hi');
		$http({
			method:'POST',
			url:'/postbirthday',
			data:$scope.birth
		}).then function success(response){
			alert('email sent');
		}, function error(response){
			alert('please try again');
		})
	}
})










var express = require('express');
var router = express.Router();
var nodemailer= require('nodemailer');
var monk = require('monk');
var db = monk('localhost:27017/crud');
var col = db.get('birth');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/birthday', function(req, res, next) {
  res.render('birthday',);
});
module.exports = router;
//-------bday mail-----------
router.post('/postbirth',function(req,res){
	var data={
		Name:req.body.Name,
		Mobile:req.body.Mobile,
		Email:req.body.Email,
		DOB :req.body.dob
	}
	var bdate =moment(req.body.dob).format('DD-MM');
	console.log(Time)
	var Time = moment().format('hh:mm:ss');
	console.log(Time)
	var Date = moment.format('DD-MM');
	console.log(Date);
	if (bdate==Date){
		var transporter = nodemailer.createTransport({
 	 service: 'gmail',
  		auth: {
    	user: 'pratyushamurthy017mail.com',
    	password: 'Pratyu017'
  		}
  	 });
		var mailOptions = {
  		from: 'Pratyusha',
  		to: req.body.Email,
  		subject:'BIRTHDAY WISHES',
  		text: 'HAPPY BIRTHDAY'+req.body.Name
	 };
		transporter.sendMail(mailOptions,function(err,info){
			if (err) {
				console.log(err);
			} else {
				console.log('Email sent');
				res.send(info);
			}
		});
  	}
});
module.exports = router;
