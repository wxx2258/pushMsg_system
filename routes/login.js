var router = require('koa-router')();
var sign_fn = require('../controller/userhandle/sign.js');
var co =require('co');

router.post('/login', function *(next) {
	var userMsg = this.request.body;
	var ajaxResult = yield co(sign_fn.login(userMsg));
	if(!ajaxResult){
		ajaxResult = {result:false,reason:"未知原因"};
	}
	this.body = ajaxResult;
}).post('/sign',function *(next){
	var userMsg = this.request.body;
	// console.log("login.js:15 : ",userMsg)
	var ajaxResult = yield co(sign_fn.sign(userMsg));
	// console.log("login.js:15 : ",ajaxResult);
	if(!ajaxResult){
		ajaxResult = {result:false,reason:"未知原因"};
	}
	this.body = ajaxResult;
})

module.exports = router;
