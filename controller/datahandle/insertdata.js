function insertdata(requestobj) {
    var handle_sql = "insert into ",
        temp = "";
    handle_sql+= requestobj.table + " values";

    var property = requestobj.property,
        count = 1;
    for(var item in property){
        if(count){
            if(typeof(property[item]) == "string"){
                temp += "'"+property[item]+"'";
            }else{
                temp += property[item];
            }
            count--;
        }else{
            if(typeof(property[item]) == "string"){
                temp += ',' + "'"+property[item]+"'";
            }else{
                temp += ',' + property[item];
            }
        }
        
    }
    handle_sql += "("+temp+")";
    // console.log(handle_sql);
    return handle_sql;
}

module.exports = insertdata;





