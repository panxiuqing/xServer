function renderDecorator(code, message) {
    return function (target, key, descriptor) {
        const method = target[key];
        target[key] = function (...argv) {
            const result = method.apply(target, argv);
            result.code = code;
            if (!result.message) {
                result.message = message;
            }
            return result;
        }
        return target;
    }
}

class Render {
    constructor () {

    }

    success(data) {
        return {
            code: 0,
            message: 'ok',
            data
        }
    }
}