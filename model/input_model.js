var obj={};

obj.handle_teamsStr = function(teamsStr){
	var out = teamsStr.replace(/ /g,"");
	// console.log("input_model.js5:",out);
	var result = out.split("，");
	return result;
}

obj.handle_playersStr = function(playersStr){
	var out = playersStr.replace(/ /g,"");
	// console.log("input_model.js5:",out);

	var input = out.split("，"),
		result=[];
	for (var i = 0; i < input.length; i++) {
		var resultObj = input[i].split("-");
		var temp = new inputModel(...resultObj);
		result.push(temp);
	}
	return result;
}

function inputModel(teamName,playerName){
	this.teamName = teamName;
	this.playerName = playerName;
}

// var team = " 火箭，骑士  ";
// var player = " 火 箭-哈 登，勇士-库 里 ";

// var a = obj.handle_teamsStr(team);
// var b = obj.handle_playersStr(player);
// console.log(a,b);

module.exports = obj;