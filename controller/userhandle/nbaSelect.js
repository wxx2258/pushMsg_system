var model = require('../../model/datahandle_model.js'),
	datebaseMain = require('../datahandle/datebaseMain.js');
var obj = {};

obj.allteamsSelect = function(input_teams){
	var model = getTeam_model(input_teams);
	return datebaseMain(model).then(res=>{
		return res.value;
	}).catch(err=>{
		console.log("nbaSelect.js _err:",err);
	})
}

function getTeam_model(input_teams){
	var all_array = [];
	var wheretemp="";
	for (var i = 0; i < input_teams.length; i++) {
		if(i==input_teams.length-1){
			wheretemp+=" teamName='"+input_teams[i]+"'";
		}else{
			wheretemp+=" teamName='"+input_teams[i]+"' or ";
		}
	}
	var select_model = new model.datahandleModel("dataTeam","select",null,wheretemp)
	return select_model;
}

obj.allplayeravgSelect = function(input_teams){
	var result = [];
	return getPlayer_model(input_teams).then(res=>{
		for (var i = 0; i < res.length; i++) {
			result.push(res[i].value);
		}
		return result;
	}).catch(err=>{
		console.log("nbaSelect.js _err:",err);
	})
}
function getPlayer_model(input_teams){
	var all_array = [];
	var wheretemp="",
		modeltemp = [];
	for (var i = 0; i < input_teams.length; i++) {
		modeltemp[i] = new model.datahandleModel('selectavg',"exec",null,input_teams[i].playerName);
		all_array.push(datebaseMain(modeltemp[i]))
	}
	return Promise.all(all_array);
}

obj.allplayerlastSelect = function(input_teams){
	var result = [];
	return getPlayerlast_model(input_teams).then(res=>{
		for (var i = 0; i < res.length; i++) {
			result.push(res[i].value);
		}
		return result;
	}).catch(err=>{
		console.log("nbaSelect.js _err:",err);
	})
}
function getPlayerlast_model(input_teams){
	var all_array = [];
	var wheretemp="",
		modeltemp = [];
	for (var i = 0; i < input_teams.length; i++) {
		modeltemp[i] = new model.datahandleModel('selectlast',"exec",null,input_teams[i].playerName);
		all_array.push(datebaseMain(modeltemp[i]))
	}
	return Promise.all(all_array);
}

// var test = ["火箭","骑士"];
// // console.log(obj.getTeamMsg(test))
// obj.allSelect(test).then(val=>{
// 	console.log(val);
// })
// var test2 = [
// 	{teamName:"火箭",playerName:"哈登"},
// 	{teamName:"勇士",playerName:"库里"}
// 	]
// obj.allplayeravgSelect(test2).then(val=>{
// 	console.log("57",val[0].value);
// })

module.exports = obj;


