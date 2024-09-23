import {
  validate_signin,
  handle_validation_errors,
  validate_jobs,
  validate_courses,
  validate_user_search,
  validate_course_search,
  validate_search,
  validate_courses_edit,
  validate_jobs_edit,
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
  edit_jobs,
  talent_list,
  delete_jobs,
  list_job_type,
  list_job_cats,
  post_technology,
  post_years_of_experience,
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
  router.post(
    "/admin/editjobs",
    admin_check,
    validate_jobs_edit,
    handle_validation_errors,
    edit_jobs
  );
  router.delete("/admin/deletejobs", admin_check, delete_jobs);
  router.post("/admin/postjobcategory", admin_check, post_job_category);
  router.post("/admin/postjobtype", admin_check, post_job_type);
  router.post("/admin/posttechnology", admin_check, post_technology);
  router.post("/admin/postyoe", admin_check, post_years_of_experience);
  router.post("/admin/postcourse", admin_check, validate_courses, post_courses);
  router.put(
    "/admin/editcourse",
    admin_check,
    validate_courses_edit,
    post_courses
  );
  router.post("/admin/deletecourse", admin_check, delete_course);
  // add admin verification to both APIS
  router.get("/admin/stats", stats);
  router.get("/admin/users", validate_user_search, user_list);
  router.get("/admin/jobs", validate_search, jobs_list);
  router.get("/admin/courses", validate_course_search, course_list);
  router.get("/admin/talents", validate_search, talent_list);
  router.get("/admin/jobcats", admin_check, list_job_cats);
  router.get("/admin/jobtype", admin_check, list_job_type);
};
