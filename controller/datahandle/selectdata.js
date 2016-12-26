
function selectdata(requestobj){

    var handle_sql = "";
    if(!requestobj.where){
    	handle_sql = "select * from "+requestobj.table
    }else{
    	handle_sql = "select * from "+requestobj.table+" where "+ requestobj.where;
    }
    // console.log(handle_sql);
    return handle_sql;   
}
 
module.exports = selectdata;