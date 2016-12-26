var model = require('../../model/datahandle_model.js'),
	datebaseMain = require('../datahandle/datebaseMain.js');

var signObj = {};
signObj.sign = function(userMsg) {
	var signmodel = new model.userModel(),
		sign_where = "email='" + userMsg.email + "' and mobilephone='" + userMsg.mobilephone + "'";
	
	signmodel.userName = userMsg.userName;
	signmodel.passwords = userMsg.passwords;
	signmodel.email = userMsg.email;
	signmodel.mobilephone = userMsg.mobilephone;

	var sign_datebase = new model.datahandleModel("users","select",userMsg,sign_where);
	return datebaseMain(sign_datebase).then(users=>{
		console.log("sign.js:15 ",users)
		if(!users.value.length){
			var usersNo = new model.datahandleModel("users","getMaxno","uno");
			return datebaseMain(usersNo).then(no_res=>{
				// console.log("sign.js:15 ",no_res);
				var no = no_res.value[0].maxno +1;
				signmodel.uno = no;
				var insertuser = new model.datahandleModel("users","insert",signmodel);
				// console.log("sing.js 26:",model);
				var msgSet_model = new model.userMessageSet(no,no);
				var insertmsgSet = new model.datahandleModel("user_messageSet","insert",msgSet_model);
				return datebaseMain(insertuser).then(handle_reslut=>{
					datebaseMain(insertmsgSet).then(val=>{
						// console.log("sign.js")
					});
					return handle_reslut;
				})
			})
		}else{
			return {result:false,reason:"该用户已经存在！"}
		}
	}).catch(err=>{
		console.error("sign.js_err 37: ",err)
	})

	// console.log("sign.js:4 ",sign_datebase)
	// console.log("sign.js:4 ",userMsg)
	// return sign_datebase;
}

signObj.login = function(userMsg){
	var login_where = "userName='" + userMsg.userName + "' and passwords='" + userMsg.passwords + "'";
	var login_datebase = new model.datahandleModel("users","select",userMsg,login_where);
	return datebaseMain(login_datebase).then(users=>{
		// console.log(users)
		if(!users.value.length){
			return {result:false,reason:"用户名或者密码错误！"}
		}else{
			return {result:true,uno:users.value[0].uno}
		}
	}).catch(err=>{
		console.error(err)
	})
}

module.exports = signObj;