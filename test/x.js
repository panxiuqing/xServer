const XServer = require('../index.js');

const config = {
    logger: {
        color: true,
    },
    routes: {
        '/a': (query) => { return query }
    }
}

const xServer = new XServer(config);
xServer.start();