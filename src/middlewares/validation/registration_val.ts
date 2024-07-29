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
    .notEmpty()
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
  handle_validation_errors,
};
