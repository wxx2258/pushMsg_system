
function deletedata(requestobj){
    var handle_sql = "";
    handle_sql = "delete from "+requestobj.table+" where "+ requestobj.where;
    return handle_sql; 
}



module.exports = deletedata;
