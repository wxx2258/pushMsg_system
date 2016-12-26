# pushMsg_system
消息推送系统:
* 技术选型：koa+node爬虫+sql server2014
* 启动说明：
    * 项目目录下，打开命令行，输入：
    * "npm install"
    * "npm start"
    * "输入localhost:3000"进入页面，后台管理页面"localhost:3000/manage"
    

## 前提知识
* node爬虫
* koa框架
* sql server的使用和数据库的设计
* html+css+JavaScript

## 问题记录
### 数据库设计
* 相关数据库设计过程，可查看文档。
* 数据库表建立中，存在父表包含多个字表，不能使用复合主键作为外键。
    *  方案：合并表，建立一张表，将所有主键作为复合主键。

### mssql连接sql server的数据库
1. 用户名和密码
    * 先在安全性-登录名里面设置"sa"账号的密码
    * 在最上面的“属性-安全性”里面设置 “sql 和 window验证”。
2. 错误信息：{ [ConnectionError: Failed to connect to localhost:1433 - connect ECONNREFUSED 127.0.0.1:1433]   name: 'ConnectionError',   message: 'Failed to connect to localhost:1433 - connect ECONNREFUSED 127.0.0.1:1433',   code: 'ESOCKET' }
    * 打开sql server配置工具
    * 在服务里面sql server网络设置 TCP/IP 启动
    * 在sql server服务中 sql server browser，在“属性”设置启动模式为“自动”，再启动服务
3. 注意数据库端口是否正确，默认1433，但可能不是。
    * 需要去 在服务里面 “sql server网络设置-TCP/IP启动-属性“ 查看Tcp动态端口号。 
4. 进行sql server事务执行的时候，注意操作顺序，做到正确的串行执行，否则可能会因为违反数据库完整性等原因操作失败。
    * 使用promise进行异步操作的控制。
5. 进行接口封装，各种不同的sql语句执行，如果不进行封装，逻辑混乱，模块耦合。
    * 使用 model 进行逻辑处理，传入符合操作的数据结构，在我们封装好的接口中，根据不同的类型进行增删查改。构架基本框架。

### node后台服务
1. superagent+cheerio爬虫
    * 数据模型的转换，爬虫下来的数据需要进行 一个model 进行处理，转化为符合我们数据模型的数据结构，进行数据操作。
2. co框架，结合generator，实现数据的“同步返回”
    * 使用promise，异步进行sql操作后，得到的结果我们需要在回调中获得，使用co框架和generator结合，可以让代码流程如同步执行获取结果。  
