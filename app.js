var app = require('koa')()
  , koa = require('koa-router')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');


var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var msg = require('./routes/msg');
var manage = require('./routes/manage');

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'ejs'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
koa.use('/', index.routes(), index.allowedMethods());
koa.use('/users', users.routes(), users.allowedMethods());
koa.use('/login', login.routes(), login.allowedMethods());
koa.use('/msg', msg.routes(), msg.allowedMethods());
koa.use('/manage', manage.routes(), manage.allowedMethods());

// mount root routes  
app.use(koa.routes());

app.on('error', function(err, ctx){
  logger.error('server error', err, ctx);
});

module.exports = app;
