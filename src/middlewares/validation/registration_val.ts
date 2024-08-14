import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Validation chain for user details
const validate_user_details = [
  check("first_name")
    .notEmpty()
    .isString()
    .withMessage("Name must be a valid string "),
  check("pass_word")
    .notEmpty()
    .isString()
    .withMessage("Name must be a valid string"),
  check("country")
    .optional()
    .isString()
    .withMessage("Name must be a valid string"),
  check("gender")
    .optional()
    .isString()
    .withMessage("Name must be a valid string"),
  check("last_name")
    .notEmpty()
    .isString()
    .withMessage("Name must be a valid string "),
  check("bio").optional().isString().withMessage("Bio must be a string"),
  check("email").isEmail().notEmpty().withMessage("Invalid email format"),
  check("phone_number")
    .optional()
    .isNumeric()
    .withMessage("must be a valid number"),
  check("gender").optional().isString().withMessage("must be string"),
  check("profile_image_url")
    .optional()
    .isString()
    .withMessage("must be String"),
  check("academic_details")
    .optional()
    .isObject()
    .withMessage("must be a valid object"),
  check("auth_o_id")
    .optional()
    .isString()
    .withMessage("must be a valid string"),
  check("job_status")
    .optional()
    .isObject()
    .withMessage("must be a valid object"),
  check("additional_certification")
    .optional()
    .isArray()
    .withMessage("must be a valid object"),
];

const validate_signin = [
  check("email").notEmpty().isEmail().withMessage("Email must be valid email"),
  check("password").notEmpty().isString().withMessage("Password cant be empty"),
];

const validate_otp = [
  check("email").notEmpty().isEmail().withMessage("Email must be valid email"),
  check("otp").notEmpty().isString().withMessage("Password cant be empty"),
];

const validate_mail = [
  check("email").notEmpty().isEmail().withMessage("Email must be valid email"),
];
const validate_pass = [
  check("new_pass").notEmpty().isString().withMessage("Password cant be empty"),
];

const validate_admin = [
  check("first_name")
    .notEmpty()
    .isString()
    .withMessage("First name can't be empty"),
  check("phone_number")
    .notEmpty()
    .isString()
    .withMessage("Number can't be empty"),
  check("gender").notEmpty().isString().withMessage("Gender can't be empty"),
  check("last_name")
    .notEmpty()
    .isString()
    .withMessage("Last name can't be empty"),
  check("pass_word")
    .notEmpty()
    .isString()
    .withMessage("password can't be empty"),
  check("email").notEmpty().isEmail().withMessage("email can't be empty"),
];

const validate_jobs = [
  check("job_title")
    .notEmpty()
    .isString()
    .withMessage("Job title can't be empty"),
  check("location")
    .notEmpty()
    .isString()
    .withMessage("Location title can't be empty"),
  check("job_type")
    .notEmpty()
    .isString()
    .withMessage("Job type can't be empty"),
  check("company_name")
    .notEmpty()
    .isString()
    .withMessage("company name can't be empty"),
  check("technology")
    .notEmpty()
    .isArray()
    .withMessage("technology can't be empty"),
  check("salary_range")
    .optional()
    .isString()
    .withMessage("salary has to be a valid number"),
  check("experience")
    .optional()
    .isString()
    .withMessage("experience has to be string"),
  check("about").optional().isString().withMessage("about has to be string"),
  check(" what_you_will_be_doing")
    .optional()
    .isString()
    .withMessage(" what_you_will_be_doing has to be string"),
  check("what_we_are_lookin_for")
    .optional()
    .isString()
    .withMessage("what_we_are_lookin_for has to be string"),
  check("nice_to_have")
    .optional()
    .isString()
    .withMessage("nice_to_have has to be string"),
  check("category")
    .optional()
    .isString()
    .withMessage(" skills has to be string"),
  check("ideal_candidate")
    .optional()
    .isString()
    .withMessage("ideal_candidate has to be string"),

  check("link").notEmpty().isString().withMessage("link has to be string"),
];
export const validate_search = [
  check("title").optional().isString().withMessage("must be string"),
  check("salary").optional().isNumeric().withMessage("salary must be number"),
  check("type").optional().isString().withMessage("job must be string"),
  check("location")
    .optional()
    .isString()
    .withMessage("location must be string"),
  check("limit").optional().isNumeric().withMessage("Must be number"),
  check("technology").optional().isArray().withMessage("Must be number"),
];

export const validate_courses = [
  check("title").notEmpty().isString().withMessage("title must be string"),
  check("about").notEmpty().isObject().withMessage("about must be object"),
  check("over_view")
    .optional()
    .isObject()
    .withMessage("overview must be object"),
  check("course_outline")
    .optional()
    .isString()
    .withMessage("outline must be string"),
  check("requirements")
    .optional()
    .isString()
    .withMessage("requirememnts must be string"),
  check("link").notEmpty().isString().withMessage("Must be a valid string"),
];

// Middleware to handle validation results
const handle_validation_errors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export {
  validate_user_details,
  validate_mail,
  validate_signin,
  validate_otp,
  validate_pass,
  validate_admin,
  validate_jobs,
  handle_validation_errors,
};
