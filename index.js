const Koa = require('koa');
const router = require('./src/lib/router');

const app = new Koa();

app.use(router({
    '/a': (q) => { return q.name + ' World!' }
}));

app.use(async (ctx, next) => {
    ctx.body = 'Hello';
});

app.listen(3000);