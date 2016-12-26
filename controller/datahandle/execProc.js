function exec(requestobj){
    var sql = "exec "+requestobj.table+ " '"+requestobj.where+"'";
    return sql;
}

// var model = require('../../model/datahandle_model.js');	
// var dataPlayer = new model.datahandleModel('selectavg',"exec",null,"哈登");
// console.log(exec(dataPlayer))

module.exports = exec;

