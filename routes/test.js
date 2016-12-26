var router = require('koa-router')();
var nba_fn = require('../controller/userhandle/nbasetting.js');
var co =require('co'),
	input_model = require('../model/input_model.js'),
	nbaSelect_fn = require('../controller/userhandle/nbaSelect.js');
var updatePlayer_fn = require('../controller/crawlerData/updatePlayerData.js') ,
	updateteam_fn = require('../controller/crawlerData/updateTeamData.js');

function update(input_players){
	var all_array = [updateteam_fn()];
	console.log("msg.js 48 :",input_players)
	for (var i = 0; i < input_players.length; i++) {
		all_array.push(datebaseMain(input_players[i]))
	}
	return Promise.all(all_array).then(res=>{
		return res;
	}).catch(err=>{
		console.log("msg.js_err 55 :",err)
	});
}