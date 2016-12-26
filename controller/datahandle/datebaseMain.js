var model = require('../../model/datahandle_model.js');
var handlersql_fn = require('./handlersql.js');

var obj = {};

// var dataPlayer = new model.dataPlayer('哈登',0,1,1,0);
// var insert = new model.datahandleModel("dataPlayer","insert",dataPlayer);
// var select = new model.datahandleModel("dataPlayer","select",dataPlayer,"play_no='1'");
// var deleted = new model.datahandleModel("dataPlayer","delete",dataPlayer,"play_no='1'");
// var update = new model.datahandleModel("dataPlayer","update",dataPlayer,"playerName='哈登'","playerName");

obj.handler_dataRequest = function (requestobj) {
	// var promise_array = {};
	// console.log("datebaseMain.js 14:",requestobj.type)
	var sqlyuju ;
	switch(requestobj.type){
		case 'exec':
			var exec_fn = require('./execProc.js');
			sqlyuju = exec_fn(requestobj);
			break;
		case 'getMaxno':
			var getMax_no_fn = require('./getMax_no.js');
			sqlyuju = getMax_no_fn(requestobj);
			break;
		case 'insert':
			var insert_fn = require('./insertdata.js');
			sqlyuju = insert_fn(requestobj);
			break;
		case 'select':
			var select_fn = require('./selectdata.js');
			sqlyuju = select_fn(requestobj);
			break;
		case 'update':
			var update_fn = require('./updatedata.js');	
			sqlyuju = update_fn(requestobj);
			break;
		case 'delete':
			var delete_fn = require('./deletedata.js');
			sqlyuju = delete_fn(requestobj);
			break;
		default:
			break;
	}		
	// var sqlyuju = " update dataPlayer set play_no=0,avgGameData_no = 2,dataHouse_no = 0 where playerName='哈登'"
	// var result ;
	// console.log(sqlyuju);
	return handlersql_fn(sqlyuju).then(function(val){
		// result = val;
		// console.log("datebaseMain.js:40 ",val);
		return val;
	}).catch(function(err){
		console.error("datebaseMain.js_err: ",err);
	})
	
}

// var getusers_model = new model.datahandleModel("users","select",null,"");
// obj.handler_dataRequest(getusers_model)
module.exports = obj.handler_dataRequest;