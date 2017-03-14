const fs = require('fs');
const path = require('path');

function router(routes) {

    const route = new Map();
    for (let key in routes) {
        const handler = routes[key];
        if (typeof handler === 'string') {
            route.set(key, () => fs.readFileSync(path.join(__dirname, handler), 'utf8'));
        } else if (handler instanceof Function) {
            route.set(key, handler);
        }
    }

    return async function (ctx, next) {
        const url = ctx.request.url;
        if (!route.has(url)) {
            await next();
        } else {
            const handler = route.get(url);
            const query = ctx.query;
            ctx.body = handler(query);
        }
    }
}

module.exports = router;