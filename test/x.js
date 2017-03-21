const XServer = require('../index.js');

const config = {
    logger: {
        color: true,
    },
    auth: {
        includes: [],
        excludes: ['/login']
    },
    static: '../www',
    routes: {
        '/login': () => { return 'login' },
        '/a': (query) => { return query }
    }
}

const xServer = new XServer(config);
xServer.start();