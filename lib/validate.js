const user = new Map();

function validate(cookie) {
    const token = cookie.get(token);
    if (user.has(token)) {
        return false;
    } else {
        return user.get(token);
    }
}

function add(token, info = {}) {
    user.set(token, info);
}

exports.validate = validate;
exports.add = add;