var datebaseMain = require('../datahandle/datebaseMain.js'),
	get_nba_player_fn = require("./get_nba_player.js"),
	model = require('../../model/datahandle_model.js');
var insert_and_update = require('../datahandle/insert_and_update.js');
var input = {
	teamName:'勇士',
	playerName:'库里'
}
// var input = {
// 	teamName:'火箭',
// 	playerName:'哈登'
// }
// var mainkey = "playerName"

// updatePlayer(input,"playerName").then(val=>{
// 	console.log("16:::::::",val)
// })

// 主函数
function updatePlayer(input,mainkey){
	return getPlayerMsg(input,mainkey).then(msg=>{
		var player_where = "playerName='"+msg.dataPlayer.playerName+"'",
			playermodel =new model.datahandleModel("dataPlayer","insert",msg.dataPlayer,player_where);	
		return datebase_player(msg).then(val=>{
			// console.log(val)
			return insert_and_update(playermodel).then(val=>{
				return val;
			});
		})
	})	
}

// promise.all 插入或更新球员相关数据
function datebase_player(obj){
	var avg_property = new model.avgGameDataModel(...obj.result),
		last_property = new model.lastGameDataModel(...obj.lastResult);
	var avg_where = "avgGameData_no="+avg_property.avgGameData_no,
		last_where = "lastGameData_no="+last_property.lastGameData_no;
		
	var avgmodel =new model.datahandleModel("avgGameData","insert",avg_property,avg_where),
		lastmodel =new model.datahandleModel("lastGameData","insert",last_property,last_where);	
		

	// console.log("updatePlayerData.js: 33 ",avgmodel,lastmodel);
	return Promise.all([insert_and_update(avgmodel) , insert_and_update(lastmodel)]);	
}

// promise.all 获取no
function getno(){
	var avgmodel =new model.datahandleModel("avgGameData","getMaxno","avgGameData_no");
	var lastmodel =new model.datahandleModel("lastGameData","getMaxno","lastGameData_no");	
	var playermodel =new model.datahandleModel("dataPlayer","getMaxno","play_no");	
	return Promise.all([datebaseMain(avgmodel) , datebaseMain(lastmodel),datebaseMain(playermodel)]);
}

// 获取球员信息，并添加no到数据中。
function getPlayerMsg(input,mainkey){
	var where = mainkey + "='" + input[mainkey] + "'",
		inputobj = new model.datahandleModel("dataPlayer","select",input,where)
	// 获取球员信息
	// console.log("updatePlayerData.js 61  :",input)

	return get_nba_player_fn(input).then(function(play_val){
		// console.log("updatePlayerData.js: 94 ",play_val)
		// console.log("updatePlayerData.js 65  :",play_val)
		return play_val;
	}).then(function(play_val){
		// 获取场均和最近一场的no
		var temp = play_val;
		return datebaseMain(inputobj).then(function(no_val){
			if(!no_val.value.length){
				return getno().then(function(val){
					// console.log("updatePlayerData.js: 96-no ",val[2].value[0])
					var player_no = val[2].value[0].maxno +1,
						avg_no = val[0].value[0].maxno +1,
						last_no = val[1].value[0].maxno +1;
					temp.result.unshift(avg_no);
					temp.lastResult.unshift(last_no);
					// console.log(input.playerName,player_no,avg_no,last_no,0)
					var dataPlayer = new model.dataPlayer(input.playerName,player_no,avg_no,last_no,0);
					temp.dataPlayer = dataPlayer;
					return temp;
				})
			}else{
				// console.log(result);

				temp.dataPlayer = no_val.value[0];
				temp.result.unshift(no_val.value[0].avgGameData_no);
				temp.lastResult.unshift(no_val.value[0].lastGameData_no);	
				// console.log("updatePlayerData.js 87 :",temp)
				return temp;
			}
		})	
	})
}

module.exports = updatePlayer;