"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle_validation_errors = exports.validate_jobs = exports.validate_admin = exports.validate_pass = exports.validate_otp = exports.validate_signin = exports.validate_mail = exports.validate_user_details = exports.validate_courses_edit = exports.validate_courses = exports.validate_course_search = exports.validate_user_search = exports.validate_search = exports.validate_jobs_edit = void 0;
const express_validator_1 = require("express-validator");
// Validation chain for user details
const validate_user_details = [
    (0, express_validator_1.check)("first_name")
        .notEmpty()
        .isString()
        .withMessage("Name must be a valid string "),
    (0, express_validator_1.check)("pass_word")
        .notEmpty()
        .isString()
        .withMessage("Name must be a valid string"),
    (0, express_validator_1.check)("country")
        .optional()
        .isString()
        .withMessage("Name must be a valid string"),
    (0, express_validator_1.check)("gender")
        .optional()
        .isString()
        .withMessage("Name must be a valid string"),
    (0, express_validator_1.check)("last_name")
        .notEmpty()
        .isString()
        .withMessage("Name must be a valid string "),
    (0, express_validator_1.check)("bio").optional().isString().withMessage("Bio must be a string"),
    (0, express_validator_1.check)("email").isEmail().notEmpty().withMessage("Invalid email format"),
    (0, express_validator_1.check)("phone_number")
        .optional()
        .isNumeric()
        .withMessage("must be a valid number"),
    (0, express_validator_1.check)("gender").optional().isString().withMessage("must be string"),
    (0, express_validator_1.check)("profile_image_url")
        .optional()
        .isString()
        .withMessage("must be String"),
    (0, express_validator_1.check)("academic_details")
        .optional()
        .isObject()
        .withMessage("must be a valid object"),
    (0, express_validator_1.check)("auth_o_id")
        .optional()
        .isString()
        .withMessage("must be a valid string"),
    (0, express_validator_1.check)("job_status")
        .optional()
        .isObject()
        .withMessage("must be a valid object"),
    (0, express_validator_1.check)("additional_certification")
        .optional()
        .isArray()
        .withMessage("must be a valid object"),
];
exports.validate_user_details = validate_user_details;
const validate_signin = [
    (0, express_validator_1.check)("email").notEmpty().isEmail().withMessage("Email must be valid email"),
    (0, express_validator_1.check)("password").notEmpty().isString().withMessage("Password cant be empty"),
];
exports.validate_signin = validate_signin;
const validate_otp = [
    (0, express_validator_1.check)("email").notEmpty().isEmail().withMessage("Email must be valid email"),
    (0, express_validator_1.check)("otp").notEmpty().isString().withMessage("Password cant be empty"),
];
exports.validate_otp = validate_otp;
const validate_mail = [
    (0, express_validator_1.check)("email").notEmpty().isEmail().withMessage("Email must be valid email"),
];
exports.validate_mail = validate_mail;
const validate_pass = [
    (0, express_validator_1.check)("new_pass").notEmpty().isString().withMessage("Password cant be empty"),
];
exports.validate_pass = validate_pass;
const validate_admin = [
    (0, express_validator_1.check)("first_name")
        .notEmpty()
        .isString()
        .withMessage("First name can't be empty"),
    (0, express_validator_1.check)("phone_number")
        .notEmpty()
        .isString()
        .withMessage("Number can't be empty"),
    (0, express_validator_1.check)("gender").notEmpty().isString().withMessage("Gender can't be empty"),
    (0, express_validator_1.check)("last_name")
        .notEmpty()
        .isString()
        .withMessage("Last name can't be empty"),
    (0, express_validator_1.check)("pass_word")
        .notEmpty()
        .isString()
        .withMessage("password can't be empty"),
    (0, express_validator_1.check)("email").notEmpty().isEmail().withMessage("email can't be empty"),
];
exports.validate_admin = validate_admin;
const validate_jobs = [
    (0, express_validator_1.check)("job_title")
        .notEmpty()
        .isString()
        .withMessage("Job title can't be empty"),
    (0, express_validator_1.check)("min_salary").isNumeric(),
    (0, express_validator_1.check)("max_salary").isNumeric(),
    (0, express_validator_1.check)("skills").isString(),
    (0, express_validator_1.check)("location").isString(),
    (0, express_validator_1.check)("job_type")
        .notEmpty()
        .isString()
        .withMessage("Job type can't be empty"),
    (0, express_validator_1.check)("company_name")
        .notEmpty()
        .isString()
        .withMessage("company name can't be empty"),
    (0, express_validator_1.check)("technology").isArray(),
    (0, express_validator_1.check)("salary_range").optional().isString(),
    (0, express_validator_1.check)("experience").optional().isString(),
    (0, express_validator_1.check)("about").optional().isString().withMessage("about has to be string"),
    (0, express_validator_1.check)("what_you_will_be_doing")
        .optional()
        .isString()
        .withMessage(" what_you_will_be_doing has to be string"),
    (0, express_validator_1.check)("what_we_are_lookin_for")
        .optional()
        .isString()
        .withMessage("what_we_are_lookin_for has to be string"),
    // check("nice_to_have")
    //   .optional()
    //   .isString()
    //   .withMessage("nice_to_have has to be string"),
    (0, express_validator_1.check)("category")
        .optional()
        .isString()
        .withMessage(" skills has to be string"),
    (0, express_validator_1.check)("ideal_candidate")
        .optional()
        .isString()
        .withMessage("ideal_candidate has to be string"),
    (0, express_validator_1.check)("link").notEmpty().isString().withMessage("link has to be string"),
];
exports.validate_jobs = validate_jobs;
exports.validate_jobs_edit = [
    (0, express_validator_1.check)("job_id").notEmpty().isString(),
    (0, express_validator_1.check)("job_title")
        .notEmpty()
        .isString()
        .withMessage("Job title can't be empty"),
    (0, express_validator_1.check)("skills").notEmpty().isString().withMessage("Skills can't be empty"),
    (0, express_validator_1.check)("location")
        .notEmpty()
        .isString()
        .withMessage("Location title can't be empty"),
    (0, express_validator_1.check)("job_type")
        .notEmpty()
        .isString()
        .withMessage("Job type can't be empty"),
    (0, express_validator_1.check)("company_name")
        .notEmpty()
        .isString()
        .withMessage("company name can't be empty"),
    (0, express_validator_1.check)("technology")
        .notEmpty()
        .isArray()
        .withMessage("technology can't be empty"),
    (0, express_validator_1.check)("salary_range")
        .optional()
        .isString()
        .withMessage("salary has to be a valid number"),
    (0, express_validator_1.check)("experience")
        .optional()
        .isString()
        .withMessage("experience has to be string"),
    (0, express_validator_1.check)("about").optional().isString().withMessage("about has to be string"),
    (0, express_validator_1.check)(" what_you_will_be_doing")
        .optional()
        .isString()
        .withMessage(" what_you_will_be_doing has to be string"),
    (0, express_validator_1.check)("what_we_are_lookin_for")
        .optional()
        .isString()
        .withMessage("what_we_are_lookin_for has to be string"),
    (0, express_validator_1.check)("nice_to_have")
        .optional()
        .isString()
        .withMessage("nice_to_have has to be string"),
    (0, express_validator_1.check)("category")
        .optional()
        .isString()
        .withMessage(" skills has to be string"),
    (0, express_validator_1.check)("ideal_candidate")
        .optional()
        .isString()
        .withMessage("ideal_candidate has to be string"),
    (0, express_validator_1.check)("link").notEmpty().isString().withMessage("link has to be string"),
];
exports.validate_search = [
    (0, express_validator_1.query)("title").optional().isString().withMessage("must be string"),
    (0, express_validator_1.query)("salary").optional().isNumeric().withMessage("salary must be number"),
    (0, express_validator_1.query)("type").optional().isString().withMessage("job must be string"),
    (0, express_validator_1.query)("location")
        .optional()
        .isString()
        .withMessage("location must be string"),
    (0, express_validator_1.query)("limit").optional().isNumeric().withMessage("Must be number"),
    (0, express_validator_1.query)("technology").optional().isString().withMessage("Must be number"),
];
exports.validate_user_search = [
    (0, express_validator_1.query)("name").optional().isString().withMessage("name must be string"),
    (0, express_validator_1.query)("email").optional().isString().withMessage("email must be string"),
    (0, express_validator_1.query)("limit").optional().isNumeric().withMessage("Must be number"),
    (0, express_validator_1.query)("page").optional().isNumeric().withMessage("Must be number"),
];
exports.validate_course_search = [
    (0, express_validator_1.query)("title").optional().isString().withMessage("title must be string"),
    (0, express_validator_1.query)("limit").optional().isNumeric().withMessage("Must be number"),
    (0, express_validator_1.query)("page").optional().isNumeric().withMessage("Must be number"),
];
exports.validate_courses = [
    (0, express_validator_1.check)("title").notEmpty().isString().withMessage("title must be string"),
    (0, express_validator_1.check)("about").notEmpty().isObject().withMessage("about must be object"),
    (0, express_validator_1.check)("over_view")
        .optional()
        .isObject()
        .withMessage("overview must be object"),
    (0, express_validator_1.check)("course_outline")
        .optional()
        .isString()
        .withMessage("outline must be string"),
    (0, express_validator_1.check)("requirements")
        .optional()
        .isString()
        .withMessage("requirememnts must be string"),
    (0, express_validator_1.check)("link").notEmpty().isString().withMessage("Must be a valid string"),
];
exports.validate_courses_edit = [
    (0, express_validator_1.check)("course_id").notEmpty().isString().withMessage("title must be string"),
    (0, express_validator_1.check)("title").optional().isString().withMessage("title must be string"),
    (0, express_validator_1.check)("about").optional().isObject().withMessage("about must be object"),
    (0, express_validator_1.check)("over_view")
        .optional()
        .isObject()
        .withMessage("overview must be object"),
    (0, express_validator_1.check)("course_outline")
        .optional()
        .isString()
        .withMessage("outline must be string"),
    (0, express_validator_1.check)("requirements")
        .optional()
        .isString()
        .withMessage("requirememnts must be string"),
    (0, express_validator_1.check)("link").notEmpty().isString().withMessage("Must be a valid string"),
];
// Middleware to handle validation results
const handle_validation_errors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handle_validation_errors = handle_validation_errors;
//# sourceMappingURL=registration_val.js.map