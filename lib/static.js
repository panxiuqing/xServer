const fs = require('fs');
const path = require('path');

function readDir(absolutePath) {
    const dirList = fs.readdirSync(absolutePath);
    return dirList.filter(dir => fs.statSync(path.join(absolutePath, dir)).isDirectory());
}

function staticer(pathname) {
    const absolutePath = path.join(__dirname, pathname);
    const dirList = readDir(absolutePath);
    // Todo: Add dir wather
    return async function (ctx, next) {
        const pathArray = ctx.path.split('/');
        const dir = pathArray[0] || pathArray[1];
        if (dirList.includes(dir)) {
            ctx.body = fs.readFileSync(path.join(absolutePath, ctx.path), 'utf8');
        } else {
            await next();
        }
    }
}

module.exports = staticer;