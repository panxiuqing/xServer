const XServer = require('../index.js');
const path = require('path');

const config = {
    logger: {
        color: true,
    },
    auth: {
        method: (cookie) => {
            // return true or false
            return cookie.get('id');
        },
        includes: [],
        excludes: ['/login']
    },
    static: path.join(__dirname, '../www'),
    routes: {
        '/login': (query, cookie) => { cookie.set('id', 'abc'); return 'a' },
        '/a': (query) => { return query },
        '/api/user': (query, data, cookie) => {
            // post request
            // query is url query
            // data is post data
        }
    },
}

const xServer = new XServer(config);
xServer.start();