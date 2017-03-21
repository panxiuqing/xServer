const {validate} = require('./validate');

function auth(config) {
    const includes = config.includes || [];
    const excludes = config.excludes || [];
    return async function (ctx, next) {
        const path = ctx.path;
        if (includes.includes(path) || !includes.length && !excludes.includes(path)) {
            const user = validate(ctx.cookies);
            if (user) {
                ctx.state.user = user;
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