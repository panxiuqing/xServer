const XServer = require('../index.js');

const config = {
    logger: {
        color: true,
        format(info) {
            return `${info.method}:${info.time}[${info.url}]`;
        }
    },
    routes: {
        '/a': () => { return 'Hello' }
    }
}

const xServer = new XServer(config);
xServer.start();