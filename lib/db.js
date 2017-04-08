const mysql = require('mysql');

function connect(config) {
    const connection = mysql.createConnection(config);
    
    return async function (ctx, next) {
        try {
            ctx.state.result = await search(ctx.state.query);
            await next();
        } catch (e) {
            throw e;
        }
    }

    function search(query) {
        return new Promise((resolve, reject) => {
            connection.query(query, (error, result, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({result, fields});
                }
            })
        });
    }
}

module.exports = connect;