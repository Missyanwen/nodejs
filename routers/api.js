var express = require('express');
var router = express.Router();

var User = require('../models/User');

//统一返回格式
var responseData;

router.use(function(req,res,next){
	responseData = {
		code : 0, //返回的码
		message:''//返回的信息
	}
	next()
})



/**
  用户注册
    --1.用户名不能为空
    --2.密码不能为空
    --3.再次输入密码必须一致

    1.用户是滞已经被注册了
    	数据库查询

**/

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

	if(password == ""){
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

	//用户名是否已经被注册，如果 
	User.findOne({
		username:username
	}).then(function(userInfo){
		if(userInfo) {
			//表示数据库中有该记录
			responseData.code =4;
			responseData.message ='用户已被注册';
			res.json(responseData);
			return;
		}
		//保存用户注册的信息到数据库中
		var user = new User({
			username: username,
			password: password
		});
		return user.save();
	}).then(function(newUserInfo){
		console.log(newUserInfo);
		responseData.message = '注册成功';
		res.json(responseData);
	})

	
});

/**
	登录
**/
router.post('/user/login',function(req,res,next){
	var username = req.body.username;
	var password = req.body.password;

	if(username == '' || password == '') {
		responseData.code = 1;
		responseData.message = '用户名和密码不能为空'
		res.json(responseData);
		return;
	}

	//查询 数据库中相同用户名和密码的记录是否存在

	User.findOne({
		username: username,
		password: password,
	}).then(function(userInfo){
		
		if(!userInfo) {
			responseData.code = 2;
			responseData.message = '用户名或密码错误'
			res.json(responseData);
			return;
		}
		//用户名密码正确
		responseData.message = '登录成功';
		responseData.userInfo = {
			_id:userInfo._id,
			username:userInfo.username
		}
		req.cookies.set('userInfo', JSON.stringify({
			_id: userInfo._id,
			username: userInfo.username
		}));
		res.json(responseData);
		return;
	})
});

//退出 
router.get('/user/logout',function(req,res,next){
	req.cookies.set('userInfo', null);
	res.json(responseData);	
});

module.exports = router;