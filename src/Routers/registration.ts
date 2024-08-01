import {
  validate_user_details,
  handle_validation_errors,
  validate_mail,
  validate_otp,
  validate_pass,
  validate_admin,
} from "../middlewares/validation/registration_val";
import {
  register_user,
  create_otp_for_password_reset,
  verify_otp,
  set_new_pass,
  create_admin,
} from "../Controllers/registrations";
import express from "express";
import { check_reset_auth } from "../middlewares/auth_checker";

export default (router: express.Router) => {
  router.post(
    "/registration/createaccount",
    validate_user_details,
    handle_validation_errors,
    register_user
  );
  router.post(
    "/registration/requestforotp",
    validate_mail,
    handle_validation_errors,
    create_otp_for_password_reset
  );
  router.post(
    "/registration/verifyotp",
    validate_otp,
    handle_validation_errors,
    verify_otp
  );
  router.put(
    "/registration/setnewpass",
    validate_pass,
    handle_validation_errors,
    check_reset_auth,
    set_new_pass
  );
  router.post(
    "/registration/createadmin",
    validate_admin,
    handle_validation_errors,
    create_admin
  );
};
