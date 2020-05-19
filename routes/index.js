var express = require('express');
var router = express.Router();
var Qrcode = require('qrcode');
//var randomstring = require("randomstring");
var nodemailer = require('nodemailer');
var moment = require('moment');
var monk = require('monk');
var db = monk('localhost:27017/codeheat');
var col = db.get('birthday');
var signup = db.get('signup');
var tasks=db.get('tasks');

/* GET home page. */
router.get('/home', function(req,res){
  res.render('index');
});

router.get('/', function(req,res){
  res.render('login');
});

router.get('/birthday', function(req,res){
  res.render('birthday');
})

router.get('/logout', function(req,res){
  res.redirect('/');
});

router.get('/forgot', function(req,res){
  res.render('forgot');
});

router.get('/task', function(req,res){
  res.render('tasks');
});

router.get('/getuser', function(req, res) {
  col.find({}, function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      //console.log(docs);
      res.send(docs);
    }
  })
});

router.post('/postuser', function(req,res){
  //console.log(req.body);
  col.insert(req.body, function(err,docs){
  	if(err){
  		console.log(err);
  	}
  	else{
  		//console.log(docs);
  		res.send(docs);
  	}
  })
})

router.put('/edituser/:a', function(req,res){
  console.log(req.params.a);
  console.log(req.body);
  col.update({"_id":req.params.a},{$set:req.body}, function(err,docs){
    if (err) {
      console.log(err);
    }
    else{
      //console.log(docs);
      res.send(docs);
    }
  });
});

router.delete('/deleteuser/:id', function(req,res){
  //console.log(req.params.id)
  col.remove({"_id":req.params.id}, function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      //console.log(docs);
      res.send(docs);
    }
  });
});
//--------------------------------------signup---------------------------------------
router.post('/postsignup', function(req,res){
  // var data = {
  //   name : req.body.name,
  //   email : req.body.email,
  //   password : req.body.password
  // }
  signup.insert(req.body, function(err,docs){
    if (err) {
      console.log(err);
    }
    else{
      res.send(docs);
    }
  });
  // if(email==req.body.email){
  //   alert("already registered")
  // }
});

router.post('/postlogin', function(req,res){
  var email1 = req.body.email;
  var password1 = req.body.password;
  signup.findOne({"email":email1,"password":password1}, function(err,docs){
    if(docs){
      res.send(docs);
    }
    else{
      res.sendStatus(500);
    }
  });
});
//-------------------------------OTP Email--------------------------------------
router.post('/postforgot', function(req,res){
  var email = req.body.email;
//var newpassword = randomstring.generate(7);
  
  signup.update({"email":email},{$set:{"password":newpassword}});

  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'princesspratyu17@gmail.com',
    pass: 'Princess@07'
  }
  });

  var mailOptions = {
    from: 'Pratyu',
    to: email,
    subject: 'OTP',
    text: 'Your OTP is'+newpassword
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent');
      res.send(info);
    }
  });
});
//----------------------------------birthday mail--------------------------

router.post('/postbirthday', function(req,res){
  console.log(req.body);
  var bdate = moment(req.body.dob).format('DD-MM');
  console.log(bdate);
  //var Time = moment().format('hh:mm:ss:a');
 // console.log(Time);
  var Date = moment().format('DD-MM');
  //console.log(Date);
  if(bdate==Date){
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
       user: 'princesspratyu17@gmail.com',
       pass: 'Princess@07'
      }
    });

    var mailOptions = {
      from: 'Pratyu',
      to: req.body.email,
      subject: 'Birthday Wishes',
      text: 'Hi' +req.body.name+ 'Happy Birthday'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent');
        res.send(info);
      }
    });
  }
 
  if(bdate=Date+1){
     col.insert(req.body,function(err,docs){
    if (err) {
      console.log(err);
    }
    else{
      console.log(docs);
      res.send(docs)
    }
  })
    
  }
})
//---------------------------qrcode--------------------------

router.get('/qrcode',function(req,res){
  Qrcode.toDataURL('Pratyu',function(err,url){
   console.log(url);
   res.render('qrcode',{'qrcode':url});
  })
})
//-----------------------taskmanager-------------------------

router.post('/posttask', function(req,res){
  //console.log(req.body);
  var bdate = moment(req.body.Date).format('DD-MM');
  tasks.insert(req.body, function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      console.log(docs);
      res.send(docs);
    }
  })
})
router.get('/gettasks',function(req,res){
  tasks.find({},function(err,docs){
    if (err) {
      console.log(err);
    }
    else{
      console.log(docs);
      res.send(docs);
    }
  })
})





module.exports = router;