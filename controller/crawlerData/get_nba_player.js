var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');
	// model = require('../model/datahandle_model.js');
// var datebaseMain = require('../datahandle/datebaseMain.js');



var getTeamerUrl = function(input){

	return new Promise(function(resolve,reject){
		var teamReg = new RegExp(input.teamName);
		superagent
			.get('https://nba.hupu.com/players')
			.end(function(err,res){
				if(err){
					reject(err);
				}
				var $ = cheerio.load(res.text,{decodeEntities: false});
				var teamlist = $(".team_name a");
				var teamUrlTemp = "";
				for (var i = 0; i < teamlist.length; i++) {
					if(teamReg.test(teamlist.eq(i).text())){
						teamUrlTemp = teamlist.eq(i).attr("href");
						break;
					}
				}
				// console.log(teamUrlTemp.length)
				getPlayerUrl(input,teamUrlTemp,resolve,reject);
			})		
	})
}

var getPlayerUrl = function(input,teamUrlTemp,resolve,reject){
	var playerReg = new RegExp(input.playerName);
	superagent
		.get(teamUrlTemp)
		.end(function(err,res){
			if(err){
				reject(err);
			}
			var $ = cheerio.load(res.text,{decodeEntities: false});
			var playerlist = $(".players_table .left  a");
			var playerUrlTemp = "";

			for (var i = 0; i < playerlist.length; i++) {
				if(playerReg.test(playerlist.eq(i).text())){
					playerUrlTemp = playerlist.eq(i).attr("href");
					break;
				}
			}
			// console.log(playerUrlTemp.length)
			getPlayerData(playerUrlTemp,resolve,reject);
		})	
}

var getPlayerData = function(playerUrlTemp,resolve,reject){
	superagent
	.get(playerUrlTemp)
	.end(function(err,res){
		if(err){
			reject(err);
		}
		var result = [];
		var lastResult = []; 
		var $ = cheerio.load(res.text,{decodeEntities: false});
		var playerdatalist = $(".Js-show-table").first()
								.find(".players_table").first()
								.find(".color_font1").next().find('td');

		for (var i = 0; i < playerdatalist.length; i++) {
			result[i] = playerdatalist.eq(i).text();
		}
		var playerLastgameList = $(".Js-show-table").first()
								.find(".players_table").eq(1)
								.find(".color_font1").eq(1).find('td');

		// console.log(playerLastgameList.html());
		for (var i = 0; i < playerLastgameList.length; i++) {
			lastResult[i] = playerLastgameList.eq(i).text();
		}
		// console.log("get_nba_player.js 82:",playerLastgameList.eq(1).text(),lastResult)

		resolve({result:result,lastResult:lastResult});
		// fn(result,lastResult);
	})	
}


module.exports = getTeamerUrl;
