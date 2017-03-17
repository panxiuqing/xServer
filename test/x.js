const XServer = require('../index.js');

const config = {
    logger: {
        color: true,
    },
    auth: {
        includes: [],
        excludes: ['/login']
    },
    routes: {
        '/login': () => { return 'login' },
        '/a': (query) => { return query }
    }
}

const xServer = new XServer(config);
xServer.start();