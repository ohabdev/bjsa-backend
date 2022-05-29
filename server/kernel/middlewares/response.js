
/* eslint no-return-assign: 0 */

// App API response middleware
exports.success = fields => (req, res) => {

    const httpCode = res.locals.httpCode || 200;
    const code = res.locals.code || httpCode;
    const message = res.locals.message || 'OK';

    const newFields = [].concat(fields || 'data');
    let result = {};

    if (newFields.length === 1) {
        result = res.locals[newFields[0]];
    } else {
        newFields.forEach(f => result[f] = res.locals[f])
    }

    res.status(httpCode).send({
        code,
        message,
        data: result,
        error: false
    });
}