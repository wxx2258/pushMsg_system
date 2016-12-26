var obj = {};

obj.datahandleModel = function(table,type,property,where,sql){
	this.table = table;
	this.type = type;
	this.property = property;
	this.where = where;
	// this.mainkey = mainkey;
	this.sql = sql;
}

obj.selectModel = function(table,type,selectProperty,where){
	this.table = table;
	this.type = type;
	this.selectProperty = selectProperty;
	this.where = where;
}

obj.dataPlayer = function(playerName,play_no,avgGameData_no,lastGameData_no,dataHouse_no){
	this.playerName = playerName;
	this.play_no = play_no; 
	this.avgGameData_no = avgGameData_no; 
	this.lastGameData_no = lastGameData_no;
	this.dataHouse_no = dataHouse_no;
}

obj.avgGameDataModel = function(avgGameData_no,gamescore,playtime,
					shoot,shoot_hitrat,three_shoot,three_shoot_hitrat,
					penalty_shot,penalty_shot_hitrat,backboard,
					help,Steal,cover,error,foul,score){
						this.avgGameData_no = avgGameData_no;
					    this.gamescore = gamescore;
					    this.playtime = playtime;
					    this.shoot = shoot;
					    this.shoot_hitrat = shoot_hitrat;
					    this.three_shoot = three_shoot;
					    this.three_shoot_hitrat = three_shoot_hitrat;
					    this.penalty_shot = penalty_shot;
					    this.penalty_shot_hitrat = penalty_shot_hitrat;
					    this.backboard = backboard;
					    this.help = help;
					    this.Steal = Steal;
					    this.cover = cover;
					    this.error = error;
					    this.foul = foul;
					    this.score = score;
}

obj.lastGameDataModel = function(lastGameData_no,gametime,opponent,
					gamescore,playtime,shoot,shoot_hitrat,
					three_shoot,three_shoot_hitrat,penalty_shot,
					penalty_shot_hitrat,backboard,help,
					Steal,cover,error,foul,score){
						this.lastGameData_no = lastGameData_no ;
						this.gametime = gametime ;
						this.opponent = opponent ;
						this.gamescore = gamescore ;
						this.playtime = playtime ;
						this.shoot = shoot ;
						this.shoot_hitrat = shoot_hitrat ;
						this.three_shoot = three_shoot ;
						this.three_shoot_hitrat = three_shoot_hitrat ;
						this.penalty_shot = penalty_shot ;
						this.penalty_shot_hitrat = penalty_shot_hitrat ;
						this.backboard = backboard ;
						this.help = help ;
						this.Steal = Steal ;
						this.cover = cover ;
						this.error = error ;
						this.foul = foul ;
						this.score = score ;	
}

obj.dataTeam = function(teamName,teamRank,dataHouse_no,teampart){
	this.teamName = teamName;
	this.teamRank = teamRank;
	this.dataHouse_no = dataHouse_no;
	this.teampart = teampart;
}

obj.userModel = function(uno,userName,passwords,email,mobilephone){
	this.uno = uno;
	this.userName = userName;
	this.passwords = passwords;
	this.email = email;
	this.mobilephone = mobilephone;
}

obj.userMessageSet = function(messageSet_no,uno){
	this.messageSet_no = messageSet_no;
	this.uno = uno;
}
obj.messageSet = function(messageSet_no,moduleName,property_name,property_value,dataHouse_no){
	this.messageSet_no = messageSet_no;
	this.moduleName = moduleName;
	this.property_name = property_name;
	this.property_value = property_value;
	this.dataHouse_no = dataHouse_no;
}


module.exports = obj;