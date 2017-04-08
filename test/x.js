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
    },
    // db: {
    //     host: 'localhost',
    //     user: 'me',
    //     password: 'secret',
    //     database: 'my_db'
    // }
}

const xServer = new XServer(config);
xServer.start();