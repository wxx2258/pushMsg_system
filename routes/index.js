var router = require('koa-router')();

router.get('/', function *(next) {
  yield this.render('index', {
    title: '消息推送系统'
  });
});


module.exports = router;
