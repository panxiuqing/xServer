const Koa = require('koa');
const router = require('./lib/router');
const logger = require('./lib/logger');
const auth = require('./lib/auth');
const staticer = require('./lib/static');

class XServer {
    constructor (config) {
        this.app = new Koa();
        if (config.logger) {
            this.app.use(logger(config.logger));
        }
        if (config.static) {
            this.app.use(staticer(config.static));
        }
        if (config.auth) {
            this.app.use(auth(config.auth));
        }
        this.app.use(router(config.routes));
    }

    start(port) {
        this.app.listen(port || 3000);
    }
}

module.exports = XServer;