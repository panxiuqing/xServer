const fs = require('fs');
const path = require('path');

function staticer(pathname) {
    const absolutePath = pathname;
    const dirList = fs.readdirSync(absolutePath);
    const imgExts = [
        'png',
        'jpg',
        'ico',
        'gif',
        'svg'
    ]
    // Todo: Add dir wather
    return async function (ctx, next) {
        const pathArray = ctx.path.split('/');
        const dir = pathArray[0] || pathArray[1];
        if (dirList.includes(dir)) {
            if (imgExts.some(ext => ctx.path.includes(`.${ext}`))) {
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