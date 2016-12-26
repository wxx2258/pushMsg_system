var dbconnection = {};
var sql = require('mssql');

// 数据库配置
var config = {
	user:'sa',
	password:'123456',
	server:'localhost',
	database:'pushMsg',
	port:1433,
	options:{
		encrypt:true
	},
	pool:{
		min:0,
		max:10,
		idleTimeoutMillis:3000
	}
};


dbconnection.getTransaction = function(callback){
	var connection = new sql.Connection(config,function(err){
		var transaction = new sql.Transaction(connection);
		callback(sql,transaction);
	})
}

module.exports = dbconnection;