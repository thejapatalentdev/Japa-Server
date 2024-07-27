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

export { validate_user_details, handle_validation_errors };
