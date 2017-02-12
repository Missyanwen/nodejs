var express = require('express');
var router = express.Router();

var responseData;

router.use(function(req,res,next){
	responseData = {
		code : 0,
		message:''
	}
	next()
})

router.post('/user/register',function(req,res,next){
	
	var username = req.body.username;
	var password = req.body.password;
	var repassword = req.body.repassword;

	if(username == ""){
		responseData.code = 1;
		responseData.message ='用户名不能为空';
		res.json(responseData);
		return;
	}

	if(password ==""){
		responseData.code = 2;
		responseData.message = '密码不能为空';
		res.json(responseData);
		return;		
	}

	if(password !== repassword){
		responseData.code = 3;
		responseData.message = '两次密码不一样';
		res.json(responseData);
		return;		
	}
})

module.exports = router;