const fs = require('fs');
const path = require('path');

function staticer(pathname) {
    const absolutePath = pathname;
    const dirList = fs.readdirSync(absolutePath);
    // Todo: Add dir wather
    return async function (ctx, next) {
        const pathArray = ctx.path.split('/');
        const dir = pathArray[0] || pathArray[1];
        if (dirList.includes(dir)) {
            if (ctx.path.indexOf('.png') !== -1 || ctx.path.indexOf('.jpg') !== -1 || ctx.path.indexOf('.ico') !== -1) {
                ctx.set('Cache-Control', 'max-age=86400000');
                ctx.body = fs.readFileSync(path.join(absolutePath, ctx.path));
            } else {
                ctx.body = fs.readFileSync(path.join(absolutePath, ctx.path), 'utf8');
            }
        } else {
            await next();
        }
    }
}

module.exports = staticer;