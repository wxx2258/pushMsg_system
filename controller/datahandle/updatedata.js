function updatedata(requestobj) {
    var handle_sql = "update ",
        temp = "";
    handle_sql+= " "+ requestobj.table + " set ";

    var property = requestobj.property,
        count = 1;
    for(var item in property){
        // console.log(item)
        // if(item != requestobj.mainkey){
            if(count){
                if(typeof(property[item]) == "string"){
                    temp += item + "='"+property[item]+"'";
                }else{
                    temp += item + "=" + property[item];
                }
                count--;
            }else{
                if(typeof(property[item]) == "string"){
                    temp += ',' + item + "='"+property[item]+"'";
                }else{
                    temp += ',' + item + "=" + property[item];
                }
            }            
        // }
        
    }
    handle_sql += " " + temp + " where " + requestobj.where;
    // console.log("update ",handle_sql);
    return handle_sql;
}

module.exports = updatedata;





