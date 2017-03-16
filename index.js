const Koa = require('koa');
const router = require('./src/lib/router');
const logger = require('./src/lib/logger');

class XServer {
    constructor (config) {
        this.app = new Koa();
        if (config.logger) {
            this.app.use(logger(config.logger));
        }
        this.app.use(router(config.routes));
    }

    start(port) {
        this.app.listen(port || 3000);
    }
}

module.exports = XServer;