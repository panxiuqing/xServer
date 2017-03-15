const Koa = require('koa');
const router = require('./src/lib/router');
const logger = require('./src/lib/logger');

class XServer {
    constructor (config) {
        this.app = new Koa();
        if (config.logger) {
            this.app.use(async function (ctx, next) {
                const time = new Date();
                const info = {};
                await next();
                info.time = new Date() - time + ' s';
                info.url = ctx.request.url;
                info.method = ctx.request.method;
                console.log(config.logger.format(info));
            });
        }
        this.app.use(router(config.routes));
    }

    start(port) {
        this.app.listen(port || 3000);
    }
}

module.exports = XServer;