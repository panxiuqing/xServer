const {validate} = require('./validate');

function auth(config) {
    const includes = config.includes || [];
    const excludes = config.excludes || [];
    return async function (ctx, next) {
        const path = ctx.path;
        if (includes.includes(path) || !includes.length && !excludes.includes(path)) {
            const authed = config.method(ctx.cookies);
            if (authed) {
                await next();
            } else {
                ctx.body = 'Need Auth';
            }
        } else {
            await next();
        }
    }
}

module.exports = auth;