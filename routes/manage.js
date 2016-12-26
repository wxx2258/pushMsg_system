var router = require('koa-router')();
var nba_fn = require('../controller/userhandle/nbasetting.js');
var co =require('co'),
	input_model = require('../model/input_model.js'),
	nbaSelect_fn = require('../controller/userhandle/nbaSelect.js'),
	manage_handle_fn =  require('../controller/userhandle/manage_handle.js');


router.get('/', function *(next) {
	var usersResult = yield co(manage_handle_fn.getusers());

	yield this.render('manage', {
		title: '系统管理',
		usersResult:usersResult,
	});

}).post("/deleteuser",function *(next){
	var deletemsg = this.request.body;
	var deleteResult = yield co(manage_handle_fn.deleteUser(deletemsg));
	console.log("manage.js 20",deleteResult)
	var ajaxResult,ajaxflag=true;
	for (var i = 0; i < deleteResult.length; i++) {
		if(!deleteResult[i].result){
			flag = false;
			break;
		}
	}
	if(ajaxflag){
		ajaxResult = {result:true};
	}else{
		ajaxResult = {result:false,reason:"未知原因"};
	}
	this.body = ajaxResult;
})

module.exports = router;


	 