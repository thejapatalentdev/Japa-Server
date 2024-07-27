import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export default function validate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: { [key: string]: string } = {};

  errors.array().forEach((err: any) => {
    extractedErrors[err.param] = err.msg;
  });

  return res.status(400).json({
    status: "Failed",
    message: JSON.stringify(Object.values(extractedErrors)),
    errors: extractedErrors,
  });
}
