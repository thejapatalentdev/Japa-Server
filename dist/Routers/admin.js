"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registration_val_1 = require("../middlewares/validation/registration_val");
const admin_1 = require("../Controllers/admin");
const auth_checker_1 = require("../middlewares/auth_checker");
exports.default = (router) => {
    router.post("/admin/login", registration_val_1.validate_signin, registration_val_1.handle_validation_errors, admin_1.login_admin);
    router.post("/admin/postjob", auth_checker_1.admin_check, registration_val_1.validate_jobs, registration_val_1.handle_validation_errors, admin_1.post_jobs);
    router.post("/admin/editjobs", auth_checker_1.admin_check, registration_val_1.validate_jobs_edit, registration_val_1.handle_validation_errors, admin_1.edit_jobs);
    router.delete("/admin/deletejobs", auth_checker_1.admin_check, admin_1.delete_jobs);
    router.post("/admin/postjobcategory", auth_checker_1.admin_check, admin_1.post_job_category);
    router.post("/admin/postjobtype", auth_checker_1.admin_check, admin_1.post_job_type);
    router.post("/admin/posttechnology", auth_checker_1.admin_check, admin_1.post_technology);
    router.post("/admin/postyoe", auth_checker_1.admin_check, admin_1.post_years_of_experience);
    router.post("/admin/postcourse", auth_checker_1.admin_check, registration_val_1.validate_courses, admin_1.post_courses);
    router.put("/admin/editcourse", auth_checker_1.admin_check, registration_val_1.validate_courses_edit, admin_1.post_courses);
    router.post("/admin/deletecourse", auth_checker_1.admin_check, admin_1.delete_course);
    // add admin verification to both APIS
    router.get("/admin/stats", admin_1.stats);
    router.get("/admin/users", registration_val_1.validate_user_search, admin_1.user_list);
    router.get("/admin/jobs", registration_val_1.validate_search, admin_1.jobs_list);
    router.get("/admin/courses", registration_val_1.validate_course_search, admin_1.course_list);
    router.get("/admin/talents", registration_val_1.validate_search, admin_1.talent_list);
    router.get("/admin/jobcats", auth_checker_1.admin_check, admin_1.list_job_cats);
    router.get("/admin/jobtype", auth_checker_1.admin_check, admin_1.list_job_type);
};
//# sourceMappingURL=admin.js.map