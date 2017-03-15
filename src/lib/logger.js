var color = require('./color.js');

function timestamp() {
    function addZero(num) {
        return num < 10 ? '0' + num : num;
    }
    const d = new Date();
    return `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(d.getDate())} ${addZero(d.getHours())}:${addZero(d.getMinutes())}:${addZero(d.getSeconds())} `;
}

function common(colorer, s) {
    console.log(color.reset + timestamp() + colorer + s);
}

function log(s) {
    common(color.reset, s);
}

function warn(s) {
    common(color.yellow, s);
}

function info(s) {
    common(color.blue, s);
}

function error(s) {
    common(color.red, s);
}

function success(s) {
    common(color.green, s);
}

module.exports.log = log;
module.exports.warn = warn;
module.exports.error = error;
module.exports.success = success;
module.exports.info = info;