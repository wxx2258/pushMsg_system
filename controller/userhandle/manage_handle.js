var model = require('../../model/datahandle_model.js'),
	datebaseMain = require('../datahandle/datebaseMain.js');


var obj = {};

obj.getusers = function(){
	var getusers_model = new model.datahandleModel("users,user_messageSet","select",null,"users.uno=user_messageSet.uno");
	return datebaseMain(getusers_model).then(res=>{
		// console.log("mamage_handle.js 10:",res.value);
		return res.value;
	}).catch(err=>{
		console.error("mamage_handle.js_err:20 ",err);
	})
}
obj.deleteUser = function(usermsg){
	var users_where = "uno='" +usermsg.uno+"'",
		m_s_where = "uno='" +usermsg.uno+"'",
		msset_where = "messageSet_no='" +usermsg.messageSet_no+"'";
	var users_model = new model.datahandleModel("users","delete",null,users_where),
		m_s_model = new model.datahandleModel("user_messageSet","delete",null,m_s_where),
		messageSet_model = new model.datahandleModel("messageSet","delete",null,msset_where);
	var all = [datebaseMain(users_model),datebaseMain(m_s_model),datebaseMain(messageSet_model)];

	return Promise.all(all).then(res=>{
		return res;
	}).catch(err=>{
		console.log("manage_handle.js 28 ",err);
	})
}

// obj.deleteUser({uno:1,messageSet_no:1})

module.exports = obj;

 