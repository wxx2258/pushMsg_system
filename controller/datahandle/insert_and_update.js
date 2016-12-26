// var model = require('../model/datahandle_model.js'),
	
var handlersql_fn = require('./handlersql.js'),
	insert_fn = require('./insertdata.js'),
	select_fn = require('./selectdata.js'),
	update_fn = require('./updatedata.js');

var obj = {};

// var dataPlayer = new model.dataPlayer('哈登',0,1,1,0);
// var insert = new model.datahandleModel("dataPlayer","insert",dataPlayer);
// var select = new model.datahandleModel("dataPlayer","select",dataPlayer,"play_no='1'");
// var deleted = new model.datahandleModel("dataPlayer","delete",dataPlayer,"play_no='1'");
// var update = new model.datahandleModel("dataPlayer","update",dataPlayer,"playerName='哈登'","playerName");

obj.handler_dataRequest = function (requestobj) {
	// var promise_array = {};
	// console.log("datebaseMain.js 14:",requestobj.type)
	var sqlyuju = select_fn(requestobj);
	var sqlyuju2;
	// var sqlyuju = " update dataPlayer set play_no=0,avgGameData_no = 2,dataHouse_no = 0 where playerName='哈登'"
	// var result ;
	return handlersql_fn(sqlyuju).then(function(val){
		// console.log("insert_and_update:23:select_val",val)
		// console.log("insert_and_update:24",val.value.length)
		if(!val.value.length){
			sqlyuju2 = insert_fn(requestobj);
		}else{
			sqlyuju2 = update_fn(requestobj);
		}
		return handlersql_fn(sqlyuju2).then(function(val){
			// console.log("insert_and_update.js:31 ",val);
			return val;
		}).catch(function(err){
			console.error("insert_and_update.js_err: 34",err);
		})
	}).catch(function(err){
		console.error("insert_and_update.js_err: 37",err);
	})
	
}

// obj.handler_dataRequest(update)
module.exports = obj.handler_dataRequest;