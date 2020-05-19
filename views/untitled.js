var bdate = moment(req.body.dob).format('DD-MM');
  console.log(bdate);
   var Time = moment().format('hh:mm:ss:a');
   console.log(Time);
  var Date = moment().format('DD-MM');
  console.log(Date);
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
    })




    $scope.birthdays = [];
  $scope.saveData = function(birth){
      
      $scope.user.push(birth);
      console.log($scope.birth);
      $scope.birth = {};
  }
  $scope.removeData = function($index,birth){
    $scope.birthdays.splice($index,1);










     $scope.saveData = function(birth){
    console.log($scope.birthdays);
    $http({
      method : 'POST',
      url : '/postbirthday',
      data : $scope.birth
    }).then(function success(response){
      console.log('Inserted succesfully');
      //$scope.user.push(users);
      //alert('Inserted succesfully');
      $scope.birthdays.push(response.data);
      $scope.birth = {};
    }, function error(response){
      console.log('Error occured, please try again');
      alert('Error occured, please try again');
    })
  }
    } 












     $http({
      method : 'GET',
      url : '/getdetails'
    }).then(function success(response){
      console.log(response.data);
      alert('retrieved succesfully');
      $scope.birthdays=response.data;

    }, function error(response){
      console.log(response.data);
      alert('Failed, Please try again');
  });











































    router.get('/getdetails', function(req,res){
  col.find({},function(err,docs){
    if (err) {
      console.log(err);
    }
    else{
      console.log(docs);
      res.send(docs)
    }
  })
})