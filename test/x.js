const XServer = require('../index.js');
const path = require('path');

const config = {
    logger: {
        color: true,
    },
    auth: {
        includes: [],
        excludes: ['/login']
    },
    static: path.join(__dirname, '../www'),
    routes: {
        '/login': () => { return 'login' },
        '/a': (query) => { return query }
    }
}

const xServer = new XServer(config);
xServer.start();