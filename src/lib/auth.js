function auth(config) {
    const includes = config.includes || [];
    const excludes = config.excludes || [];
    return async function (ctx, next) {
        const path = ctx.path;
        if (includes.includes(path) || !includes.length && !excludes.includes(path)) {
            ctx.body = 'Need Auth';
        } else {
            await next();
        }
    }
}

module.exports = auth;