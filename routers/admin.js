var express = require('express');
var router = express.Router();


//他将监听以/user开头的路由
router.get('/user',function(req,res,next){
	res.send('User');
})

module.exports = router;