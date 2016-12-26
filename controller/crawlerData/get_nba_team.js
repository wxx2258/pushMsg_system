var superagent = require('superagent');
var cheerio = require('cheerio');
// var async = require('async');
var model = require('../../model/datahandle_model.js');


// var input = {
// 	team:'火箭',
// 	player:''
// }

var eastTeam = [],
	westTeam = [];
var getTeamerMsg = function(){
	return new Promise(function(resolve,reject){
		superagent
			.get('https://nba.hupu.com/teams/spurs')
			.end(function(err,res){
				if(err){
					reject(err);
				}
				var $ = cheerio.load(res.text,{decodeEntities: false});
				var east_teamlist = $(".east_table tr td a");
				var west_teamlist = $(".west_table tr td a");

				var len = east_teamlist.length;
				for (var i = 0; i < len; i++) {
					var easttemp = new model.dataTeam(),
						westtemp = new model.dataTeam();
					easttemp.dataHouse_no = westtemp.dataHouse_no=0;
					easttemp.teampart = "东部";
					westtemp.teampart = "西部";
					easttemp.teamRank = i+1;
					easttemp.teamName = east_teamlist.eq(i).text();
					westtemp.teamRank = i+1;
					westtemp.teamName = west_teamlist.eq(i).text();
					// 插入数组中
					eastTeam.push(easttemp);
					westTeam.push(westtemp);
				}
				// console.log(eastTeam.length);
				resolve({westTeam:westTeam,eastTeam:eastTeam});
		})		
	})
}

// getTeamerMsg(function(a,b){
// 	console.log(a,b)
// })
module.exports = getTeamerMsg;