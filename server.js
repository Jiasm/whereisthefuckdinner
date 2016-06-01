var koa = require('koa');
var router = require('koa-router')();
var views = require('koa-views');
var serve = require('koa-static');

var app = koa();

router.get('/', function* (next) {

  console.log(233);
  yield this.render('index');
});

app.use(serve(`${__dirname}/lib/`));
app.use(views(`${__dirname}/views/`));
app.use(router.routes()).use(router.allowedMethods());

app.listen(12306, () => console.log('run as 12306'));
