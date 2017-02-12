var mongoose = require('mongoose');//建立数据库表结构

module.exports = new mongoose.Schema({
	//username
	username:String,
	//password
	password:String
})