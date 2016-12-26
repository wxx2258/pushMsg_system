function getMax_no(requestobj){
    var sql = "select max("+requestobj.property+") maxno from "+requestobj.table;
    return sql;
}

// getMax_no("lastGameData","lastGameData_no",function(){})
module.exports = getMax_no;

