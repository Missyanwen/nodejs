var express = require('express');

//加载模板做到前后端分离
var swig = require('swig');

//对数据库进行操作初始化
var mongoose = require('mongoose');

//加载body-parser,用来处理post提交过来的数据 
var bodyParser = require('body-parser');

var app = express();

//设置静态文件托管目录  css/js
//当用户访问的url是以/public开始，那么直接返回对应的文件
app.use('/public',express.static(__dirname + '/public'))

//定义当前应用所使用的模板引擎
//参1：模板引擎的名称，同时也是模板文件的后缀
//参2: 用于解析处理模板内容的方法以
app.engine('html',swig.renderFile);
//设置模板文件存放的目录，参1必须是views，参2是目录
app.set('views','./views')
//注册所使用的模板引擎，参我必须是view engine，参2和app.engin这个方法中定义的模板引擎的名称是一致的
app.set('view engine','html');
//在开发过程中，需要取消模板缓存
swig.setDefaults({cache:false})
/*
*  req request
   res response
   next function
*/


//这里用到分模块管理就不用下面这个app.get了
app.use('/admin',require('./routers/admin')); //localhost:3000/admin/user 后面管理
app.use('/api',require('./routers/api'));//localhost:3000/api/user 处理rest api
app.use('/',require('./routers/main'));//localhost:3000 处理前台展示
/**
app.get('/', function (req, res, next) {
  	//res.send('Hello World!');改用模板引擎

  	//读取views目录下的指定文件，解析并返回给客户端
  	//第一个参数：表示 模板的文件，相对于views的目录 views/index.html

  	res.render('index')
});
**/

//bodyparser 设置
app.use(bodyParser.urlencoded({extended:true}));

//连接数据库 在mongoose目录的bin文件下用 [mongod --dbpath=指定到哪个目录下(db目录) --port=27018] 27108是端口
//http://mongoosejs.com/  如何去连接数据库
mongoose.connect('mongodb://localhost:27018/blog',function(err){
	if(err) {
		console.log('数据库连接失败');
	}else{
		console.log('数据库连接成功');
		var server = app.listen(3000, function () {
		var host = server.address().address;
		var port = server.address().port;

		  console.log('Example app listening at http://%s:%s', host, port);
		});
	}
});

//上面的原理：
//用户发送http请求->url->解析路由->找到匹配的规则->执行指定的绑定函数，返回对应内容给用户
// public->静态->直接读取指定目录下的文件，返回给用户
// app.use->动态->处理业务逻辑，加载模板，解析模板->返回数据给用户