var router = require('koa-router')();
var nba_fn = require('../controller/userhandle/nbasetting.js');
var co =require('co'),
	input_model = require('../model/input_model.js'),
	nbaSelect_fn = require('../controller/userhandle/nbaSelect.js');
var updatePlayer_fn = require('../controller/crawlerData/updatePlayerData.js') ,
	updateteam_fn = require('../controller/crawlerData/updateTeamData.js');

router.get('/:uno', function *(next) {
	var uno = this.params.uno;
	var nbaResult = yield co(nba_fn.getSeting(uno));	
	// console.log("msg.js 8 ",teamResult[0].property_value);
	
	var input_teams = input_model.handle_teamsStr(nbaResult.team),
		input_players = input_model.handle_playersStr(nbaResult.player);

	var result_teams = yield co(nbaSelect_fn.allteamsSelect(input_teams));
	var result_playavg = yield co(nbaSelect_fn.allplayeravgSelect(input_players));
	var result_playlast = yield co(nbaSelect_fn.allplayerlastSelect(input_players));

	yield this.render('msg', {
		title: '消息显示',
		uno:uno,
		teamVal:nbaResult.team,
		playerVal:nbaResult.player,
		result_teams:result_teams,
		result_playavg:result_playavg,
		result_playlast:result_playlast
	});

}).post('/changeSet',function *(next){
	var setMsg = this.request.body;
	// nba_fn.changeSeting(setMsg);
	var result = yield co(nba_fn.changeSeting(setMsg));
	if(!result){
		result = {result:false,reason:"未知原因"};
	}
	this.body = result;
	// console.log(setMsg);
}).post('/updateDatebase',function *(next){
	var input_players = input_model.handle_playersStr(this.request.body.msg);
	var ajaxResult,ajaxflag=true;
	var result = yield co(update(input_players));
	// console.log("44:：：：",result);
	for (var i = 0; i < result.length; i++) {
		if(!result[i].result){
			flag = false;
			break;
		}
	}
	if(ajaxflag){
		ajaxResult = {result:true};
	}else{
		ajaxResult = {result:false,reason:"未知原因"};
	}
	this.body=ajaxResult;
})


function update(input_players){
	var all_array = [updateteam_fn()];
	console.log("msg.js 48 :",input_players)
	for (var i = 0; i < input_players.length; i++) {
		all_array.push(updatePlayer_fn(input_players[i],"playerName"))
	}
	return Promise.all(all_array).then(res=>{
		// console.log("msg.js_ 60 :",res)
		return res;
	}).catch(err=>{
		console.log("msg.js_err 55 :",err)
	});
}

module.exports = router;


	 