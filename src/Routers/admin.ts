import {
  validate_signin,
  handle_validation_errors,
} from "../middlewares/validation/registration_val";
import { login_admin } from "../Controllers/admin";
import express from "express";

export default (router: express.Router) => {
  router.post(
    "/admin/login",
    validate_signin,
    handle_validation_errors,
    login_admin
  );
};
