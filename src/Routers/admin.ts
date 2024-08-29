import {
  validate_signin,
  handle_validation_errors,
  validate_jobs,
  validate_courses,
  validate_user_search,
  validate_course_search,
  validate_search,
} from "../middlewares/validation/registration_val";
import {
  login_admin,
  post_job_category,
  post_job_type,
  post_jobs,
  post_courses,
  stats,
  user_list,
  course_list,
  delete_course,
  jobs_list,
} from "../Controllers/admin";
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
  router.post("/admin/postjobcategory", admin_check, post_job_category);
  router.post("/admin/postjobtype", admin_check, post_job_type);
  router.post("/admin/postcourse", admin_check, validate_courses, post_courses);
  router.post("/admin/deletecourse", admin_check, delete_course);
  // add admin verification to both APIS
  router.get("/admin/stats", stats);
  router.get("/admin/users", validate_user_search, user_list);
  router.get("/admin/jobs", validate_search, jobs_list);
  router.get("/admin/courses", validate_course_search, course_list);
};
