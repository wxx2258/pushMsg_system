var model = require('../../model/datahandle_model.js'),
	datebaseMain = require('../datahandle/datebaseMain.js'),
	insert_and_update = require('../datahandle/insert_and_update.js');


var nbasettingObj = {};

nbasettingObj.getSeting = function(messageSet_no){
	return getSet_all(messageSet_no).then(res=>{
		
		var teamResult,playerResult;
		if(!res[0].value.length){
			teamResult="";
		}else{
			teamResult = res[0].value[0].property_value;
		}
		if(!res[1].value.length){
			playerResult="";
		}else{
			playerResult = res[1].value[0].property_value;
		}
			
		return {team:teamResult,player:playerResult};

	}).catch(err=>{
		console.error("nbasetting.js_err:20 ",err);
	})
}

function getSet_all(messageSet_no){
	var select_setwhere = "messageSet_no='"+messageSet_no
			+"' and moduleName='nba' and property_name='nba_team'";
	var select_setwhere2 = "messageSet_no='"+messageSet_no
			+"' and moduleName='nba' and property_name='nba_player'";
	var select_setModel = new model.datahandleModel("messageSet","select",null,select_setwhere),
		select_setModel2 = new model.datahandleModel("messageSet","select",null,select_setwhere2);

	return Promise.all([datebaseMain(select_setModel),datebaseMain(select_setModel2)]);	
}

nbasettingObj.changeSeting = function(setMsg){
	var change_where = "messageSet_no='"+setMsg.messageSet_no
			+"' and moduleName='"+setMsg.moduleName+"' and property_name='"+setMsg.property_name+"'";
	var change_setModel = new model.datahandleModel("messageSet","insert",setMsg,change_where);
	return insert_and_update(change_setModel).then(val=>{
		return val;
	}).catch(err=>{
		console.error("nbasetting.js_err:47 ",err);
	});
	// console.log("nbasetting.js _setMsg:42",setMsg);
}
// nbasettingObj.getSeting(1).then(val=>{
// 	console.log("nbasetting.js 39:",val)
// })
// var o =  { messageSet_no: '2',
//   moduleName: 'nba',
//   property_name: 'nba_team',
//   property_value: 'a',
//   dataHouse_no: '0' }
// nbasettingObj.changeSeting(o).then(val=>{
// 	console.log("nbasetting.js 39:",val)
// })

module.exports = nbasettingObj;

 