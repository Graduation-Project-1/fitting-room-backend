module.exports = (schema) => {
    return (req, res, next) => {
        let validation = [];
        let validationResult = schema.body.validate(req.body);
        if (validationResult.error) {
            validation.push(validationResult.error.details[0].message);
        }
        if (validation.length) {
            return res.json({
                status: 401,
                message: validation.join(),
            });
        }
        next();
    }
};