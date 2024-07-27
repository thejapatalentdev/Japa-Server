import {
  validate_user_details,
  handle_validation_errors,
} from "../middlewares/validation/registration_val";
import { register_user } from "../Controllers/registrations";
import express from "express";

export default (router: express.Router) => {
  router.post(
    "/registration/createaccount",
    validate_user_details,
    handle_validation_errors,
    register_user
  );
};
