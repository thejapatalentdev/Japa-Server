import {
  validate_signin,
  handle_validation_errors,
} from "../middlewares/validation/registration_val";
import { login_user } from "../Controllers/user";
import express from "express";

export default (router: express.Router) => {
  router.post(
    "/user/login",
    validate_signin,
    handle_validation_errors,
    login_user
  );
};
