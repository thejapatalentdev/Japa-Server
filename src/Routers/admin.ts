import {
  validate_signin,
  handle_validation_errors,
  validate_jobs,
} from "../middlewares/validation/registration_val";
import { login_admin, post_jobs } from "../Controllers/admin";
import express from "express";
import { admin_check } from "../middlewares/auth_checker";

export default (router: express.Router) => {
  router.post(
    "/admin/login",
    validate_signin,
    handle_validation_errors,
    login_admin
  );

  router.post(
    "/admin/postjob",
    admin_check,
    validate_jobs,
    handle_validation_errors,
    post_jobs
  );
};
