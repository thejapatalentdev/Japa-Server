"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registration_val_1 = require("../middlewares/validation/registration_val");
const user_1 = require("../Controllers/user");
const user_2 = require("../Controllers/user");
const admin_1 = require("../Controllers/admin");
exports.default = (router) => {
    router.post("/user/login", registration_val_1.validate_signin, registration_val_1.handle_validation_errors, user_1.login_user);
    router.post("/user/talents", user_1.apply_for_coaching);
    router.post("/user/applyforjobs", user_1.apply_for_jobs);
    router.get("/user/jobs", registration_val_1.validate_search, user_2.find_jobs);
    router.get("/user/jobyid/:id", user_1.find_job_by_id);
    router.get("/user/coursebyid/:id", user_1.find_courses_by_id);
    router.get("/user/jobcategory", user_1.list_category);
    router.get("/user/jobtypes", user_1.list_jobtype);
    router.get("/user/getcourses", user_1.find_courses);
    router.get("/user/applications", user_1.job_applied_for);
    router.get("/user/technologies", admin_1.list_technologies);
    router.get("/user/yoe", admin_1.list_yoe);
};
//# sourceMappingURL=users.js.map