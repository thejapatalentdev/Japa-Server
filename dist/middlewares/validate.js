"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validate;
const express_validator_1 = require("express-validator");
function validate(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = {};
    errors.array().forEach((err) => {
        extractedErrors[err.param] = err.msg;
    });
    return res.status(400).json({
        status: "Failed",
        message: JSON.stringify(Object.values(extractedErrors)),
        errors: extractedErrors,
    });
}
//# sourceMappingURL=validate.js.map