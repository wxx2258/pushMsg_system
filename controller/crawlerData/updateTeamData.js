
var get_nba_team = require('./get_nba_team.js');
// var datebaseMain = require('../datahandle/datebaseMain.js');
var insert_and_update = require('../datahandle/insert_and_update.js');
var model = require('../../model/datahandle_model.js');


var updateTeamData = function(){
	
	return get_nba_team().then((result)=>{
		// console.log(result);
		// result.westTeam.length
		for (var i = 0; i < result.westTeam.length; i++) {
			var where = "teamName='"+ result.westTeam[i].teamName +"'";
			var insert = new model.datahandleModel
				("dataTeam","insert",result.westTeam[i],where);
			insert_and_update(insert).then(function(val){
				// console.log('updateTeamData.js: val_18: ',val);
			});
		}
		for (var i = 0; i < result.eastTeam.length; i++) {
			var where = "teamName='"+ result.eastTeam[i].teamName +"'";
			var insert = new model.datahandleModel
				("dataTeam","insert",result.eastTeam[i],where);
			insert_and_update(insert).then(function(val){
				// console.log('updateTeamData.js: val_18: ',val);
			});
		}
		return {result:true}
	}).catch(err=>{
		console.error("updateTeamData.js_err: 22",err);
	})
}



// updateTeamData();

module.exports = updateTeamData;