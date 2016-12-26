var async = require('async');
var dbTransaction = require('./connectdb.js');

// // var handle_sql = "insert into dataPlayer values('哈登',1,3,3,0)"
// var handle_sql = "select * from dataPlayer "
// handlersql(handle_sql).then(function(value){
//     console.log("6: ",value);
// }).catch(function(err){
//     console.log("handle err: ",err,"+ handlersql.js_9");
// })


function handlersql(handle_sql){

        console.log("handlersql.js_14: ",handle_sql);
        return new Promise(function(resolve,reject){
            if(!handle_sql){
                reject("sql语句为空");
                return;
            }
            dbTransaction.getTransaction(function(sql,transaction){
                //开启事物
                transaction.begin(function(err){
                    if (err) {  
                        console.log(err);  
                        return;  
                    }  
                    //定义一个变量,如果自动回滚,则监听回滚事件并修改为true,无须手动回滚  
                    var rolledBack = false;  
                    //监听回滚事件  
                    transaction.on('rollback', function(aborted) {  
                        // console.log('监听回滚');  
                        console.log('aborted值 :', aborted);  
                        rolledBack = true;  
                    });  
                    //监听提交事件  
                    transaction.on('commit', function() {  
                        // console.log('监听提交');  
                        rolledBack = true;  
                    });  


                    // console.log(i,sql_array)
                    var request = new sql.Request(transaction);

                        // console.log(handle_sql)                      
                        request.query(handle_sql,function(err,result){
                            
                            
                            if(err){
                                if (!rolledBack) {  
                                    transaction.rollback(function(err) {  
                                        if (err) {  
                                            reject(err)
                                            return;  
                                        }  
                                    });  
                                }
                            }
                            transaction.commit(function(err) {  
                                if (err) {  
                                    reject(err)
                                    return;  
                                }  
                            });
                            resolve({result:true,value:result});
                        })                        

                    
                })
            })          
        })
}

// handlersql(sql_array)

module.exports = handlersql;