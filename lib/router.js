const fs = require('fs');
const path = require('path');

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
                ctx.body = handler(ctx.request.query);
            } else {
                ctx.body = handler(ctx);
            }
        }
    }
}

module.exports = router;