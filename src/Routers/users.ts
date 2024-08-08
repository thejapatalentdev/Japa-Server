import {
  validate_signin,
  handle_validation_errors,
  validate_search,
} from "../middlewares/validation/registration_val";
import {
  find_courses,
  find_courses_by_id,
  find_job_by_id,
  list_category,
  list_jobtype,
  login_user,
} from "../Controllers/user";
import express from "express";
import { find_jobs } from "../Controllers/user";

export default (router: express.Router) => {
  router.post(
    "/user/login",
    validate_signin,
    handle_validation_errors,
    login_user
  );
  router.get("/user/jobs", validate_search, find_jobs);
  router.get("/user/jobyid/:id", find_job_by_id);
  router.get("/user/coursebyid/:id", find_courses_by_id);
  router.get("/user/jobcategory", list_category);
  router.get("/user/jobtypes", list_jobtype);
  router.get("/user/getcourses", find_courses);
};
