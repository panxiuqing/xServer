const fs = require('fs');
const path = require('path');
const queryString = require('querystring');

function router(routes) {

    const route = new Map();
    for (let key in routes) {
        const handler = routes[key];
        if (typeof handler === 'string') {
            route.set(key, () => fs.readFileSync(handler, 'utf8'));
        } else if (handler instanceof Function) {
            route.set(key, handler);
        }
    }

    return async function (ctx, next) {
        const path = ctx.path;
        if (!route.has(path)) {
            await next();
        } else {
            const handler = route.get(path);
            if (ctx.method === 'GET') {
                ctx.body = await handler(ctx.request.query);
            } else {
                const data = await parsePost(ctx.req);
                ctx.body = await handler(ctx.request.query, data);
            }
        }
    }
}

function parsePost(req) {
    return new Promise((resolve, reject) => {
        let postData = '';
        req.addListener('data', (chunk) => {
            postData += chunk;
        });
        req.addListener('end', () => {
            console.log(req.headers);
            let data;
            if (req.headers['content-type'] === 'application/json') {
                data = JSON.parse(postData);
            } else {
                data = queryString.parse(postData);
            }
            resolve(data);
        });
    });
}

module.exports = router;