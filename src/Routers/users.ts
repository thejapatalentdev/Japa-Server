import {
  validate_signin,
  handle_validation_errors,
  validate_search,
} from "../middlewares/validation/registration_val";
import {
  apply_for_jobs,
  find_courses,
  find_courses_by_id,
  find_job_by_id,
  job_applied_for,
  list_category,
  list_jobtype,
  login_user,
  apply_for_coaching,
} from "../Controllers/user";
import express from "express";
import { find_jobs } from "../Controllers/user";
import { user_check } from "../middlewares/auth_checker";
import { list_technologies, list_yoe } from "../Controllers/admin";

export default (router: express.Router) => {
  router.post(
    "/user/login",
    validate_signin,
    handle_validation_errors,
    login_user
  );
  router.post("/user/talents", apply_for_coaching);
  router.post("/user/applyforjobs", apply_for_jobs);
  router.get("/user/jobs", validate_search, find_jobs);
  router.get("/user/jobyid/:id", find_job_by_id);
  router.get("/user/coursebyid/:id", find_courses_by_id);
  router.get("/user/jobcategory", list_category);
  router.get("/user/jobtypes", list_jobtype);
  router.get("/user/getcourses", find_courses);
  router.get("/user/applications", job_applied_for);
  router.get("/user/technologies", list_technologies);
  router.get("/user/yoe", list_yoe);
};
