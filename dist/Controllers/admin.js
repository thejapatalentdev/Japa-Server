"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set_new_pass = exports.verify_otp = exports.create_otp_for_password_reset = exports.course_list = exports.jobs_list = exports.user_list = exports.stats = exports.delete_course = exports.edit_courses = exports.post_courses = exports.list_yoe = exports.list_technologies = exports.list_job_type = exports.list_job_cats = exports.post_years_of_experience = exports.post_technology = exports.post_job_type = exports.post_job_category = exports.delete_jobs = exports.edit_jobs = exports.post_jobs = exports.talent_list = exports.login_admin = void 0;
const async_runner_1 = require("../middlewares/async_runner");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../Config/config"));
const express_validator_1 = require("express-validator");
const randomtext_1 = require("../Functions/randomtext");
const admin_1 = require("../Models/admin");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jobs_1 = require("../Models/jobs");
const courses_1 = require("../Models/courses");
const user_1 = require("../Models/user");
const crypt_1 = require("../Functions/crypt");
const mailer_1 = require("../Functions/mailer");
const key = config_1.default.key;
exports.login_admin = (0, async_runner_1.async_runner)(async (req, res) => {
    const { email, password } = (0, express_validator_1.matchedData)(req);
    const get_user = await admin_1.Admin.findOne({ email: email });
    if (get_user) {
        const pass = get_user.pass_word;
        const compare_pass = await bcrypt_1.default.compare(password, pass);
        if (compare_pass) {
            const combined = (0, randomtext_1.generateRandomParagraph)();
            const auth_token = jsonwebtoken_1.default.sign({
                first_name: get_user.first_name,
                text: combined,
                _id: get_user._id,
                right: get_user.rights,
            }, key, { expiresIn: "10days" });
            return res.json({
                message: `user_token ${auth_token}`,
                user_data: get_user,
            });
        }
    }
    return res.json({
        message: "Invalid details",
    });
});
exports.talent_list = (0, async_runner_1.async_runner)(async (req, res) => {
    const { name, page = 1, limit = 100, } = (0, express_validator_1.matchedData)(req, { locations: ["query"] });
    const filter = {};
    if (name)
        filter.full_name = { $regex: name, $options: "i" };
    // if (email) filter.user_email = { $regex: email, $options: "i" };
    const skip = (page - 1) * limit;
    const talents = await user_1.Talents.find(filter)
        .skip(skip)
        .limit(Number(limit))
        .lean()
        .exec();
    const count = await user_1.Users.countDocuments(filter);
    if (talents.length > 0) {
        return res.json({
            message: "Users",
            talents,
            total_pages: Math.ceil(count / limit),
            current_page: Number(page),
        });
    }
    res.json({
        message: "no data",
        talents: [],
    });
});
exports.post_jobs = (0, async_runner_1.async_runner)(async (req, res) => {
    const role = req.params.role;
    if (role === "admin" || role === "super_admin") {
        const { job_title, location, job_type, company_name, salary_range, experience, about, what_you_will_be_doing, what_we_are_lookin_for, category, applicants, link, } = (0, express_validator_1.matchedData)(req);
        const save_job = new jobs_1.Jobs({
            job_title,
            location,
            job_type,
            company_name,
            salary_range,
            experience,
            category,
            about,
            what_you_will_be_doing,
            what_we_are_lookin_for,
            applicants,
            link,
            date_posted: Date.now(),
        });
        const saved_job = await save_job.save();
        return res.json({
            message: saved_job ? "job saved" : "please retry",
        });
    }
    return res.json({
        message: "you have no rights",
    });
});
exports.edit_jobs = (0, async_runner_1.async_runner)(async (req, res) => {
    const role = req.params.role;
    if (role === "admin" || role === "super_admin") {
        const { job_title, location, job_type, company_name, salary_range, experience, about, what_you_will_be_doing, what_we_are_lookin_for, category, applicants, link, job_id, } = (0, express_validator_1.matchedData)(req);
        const update_job = await jobs_1.Jobs.findByIdAndUpdate(job_id, {
            job_title,
            location,
            job_type,
            company_name,
            salary_range,
            experience,
            category,
            about,
            what_you_will_be_doing,
            what_we_are_lookin_for,
            applicants,
            link,
            date_posted: Date.now(),
        }, { new: true });
        const saved_job = await update_job.save();
        return res.json({
            message: saved_job ? "job saved" : "please retry",
        });
    }
    return res.json({
        message: "you have no rights",
    });
});
exports.delete_jobs = (0, async_runner_1.async_runner)(async (req, res) => {
    const { _id } = req.body;
    const delete_one = await jobs_1.Jobs.deleteOne({ _id });
    return res.json({
        message: delete_one ? "Deleted" : "please retry",
    });
});
exports.post_job_category = (0, async_runner_1.async_runner)(async (req, res) => {
    const { name } = req.body;
    const role = req.params.role;
    if (role === "admin" || role === "super_admin") {
        const save_category = new jobs_1.Job_category({
            name,
        });
        const save_now = await save_category.save();
        return res.json({
            message: save_now ? "saved" : "not saved",
        });
    }
    return res.json({
        message: "you dont have right",
    });
});
exports.post_job_type = (0, async_runner_1.async_runner)(async (req, res) => {
    const { name } = req.body;
    const role = req.params.role;
    if (role === "admin" || role === "super_admin") {
        const save_type = new jobs_1.Job_type({
            name,
        });
        const save_now = await save_type.save();
        return res.json({
            message: save_now ? "saved" : "not saved",
        });
    }
    return res.json({
        message: "You dont have right",
    });
});
exports.post_technology = (0, async_runner_1.async_runner)(async (req, res) => {
    const { name } = req.body;
    const role = req.params.role;
    if (role === "admin" || role === "super_admin") {
        const save_type = new jobs_1.Technologies({
            name,
        });
        const save_now = await save_type.save();
        return res.json({
            message: save_now ? "saved" : "not saved",
        });
    }
    return res.json({
        message: "You dont have right",
    });
});
exports.post_years_of_experience = (0, async_runner_1.async_runner)(async (req, res) => {
    const { name } = req.body;
    const role = req.params.role;
    if (role === "admin" || role === "super_admin") {
        const save_type = new jobs_1.Years_of_experience({
            name,
        });
        const save_now = await save_type.save();
        return res.json({
            message: save_now ? "saved" : "not saved",
        });
    }
    return res.json({
        message: "You dont have right",
    });
});
exports.list_job_cats = (0, async_runner_1.async_runner)(async (req, res) => {
    const job_cats = await jobs_1.Job_category.find().lean();
    if (job_cats.length > 0) {
        return res.json({
            message: "Job categories",
            categories: job_cats,
        });
    }
    return res.json({
        message: "No categories",
        categories: [],
    });
});
exports.list_job_type = (0, async_runner_1.async_runner)(async (req, res) => {
    const job_type = await jobs_1.Job_type.find().lean();
    if (job_type.length > 0) {
        return res.json({
            message: "Job types",
            type: job_type,
        });
    }
    return res.json({
        message: "No categories",
        type: [],
    });
});
exports.list_technologies = (0, async_runner_1.async_runner)(async (req, res) => {
    const technologies = await jobs_1.Technologies.find().lean();
    if (technologies.length > 0) {
        return res.json({
            message: "Technologies",
            tech: technologies,
        });
    }
    return res.json({
        message: "No categories",
        tech: [],
    });
});
exports.list_yoe = (0, async_runner_1.async_runner)(async (req, res) => {
    const years_of_experience = await jobs_1.Years_of_experience.find().lean();
    if (years_of_experience.length > 0) {
        return res.json({
            message: "Years of experience",
            type: years_of_experience,
        });
    }
});
exports.post_courses = (0, async_runner_1.async_runner)(async (req, res) => {
    const role = req.params.role;
    if (role === "admin" || role === "super_admin") {
        const { title, about, course_outline, over_view, link, requirements } = (0, express_validator_1.matchedData)(req);
        const save_couses = new courses_1.Courses({
            title,
            about,
            link,
            course_outline,
            over_view,
            requirements,
            date_posted: Date.now(),
        });
        const saved_course = await save_couses.save();
        return res.json({
            message: saved_course ? "course saved" : "please retry",
        });
    }
    return res.json({
        message: "you have no rights",
    });
});
exports.edit_courses = (0, async_runner_1.async_runner)(async (req, res) => {
    const role = req.params.role;
    if (role === "admin" || role === "super_admin") {
        const { title, about, course_outline, over_view, link, requirements, course_id, } = (0, express_validator_1.matchedData)(req);
        const update_course = await courses_1.Courses.findByIdAndUpdate(course_id, {
            title,
            about,
            link,
            course_outline,
            over_view,
            requirements,
            date_posted: Date.now(),
        }, { new: true });
        return res.json({
            message: update_course ? "course saved" : "please retry",
        });
    }
    return res.json({
        message: "you have no rights",
    });
});
exports.delete_course = (0, async_runner_1.async_runner)(async (req, res) => {
    const { _id } = req.body;
    const delete_one = await courses_1.Courses.deleteOne({ _id });
    return res.json({
        message: delete_one ? "Deleted" : "please retry",
    });
});
exports.stats = (0, async_runner_1.async_runner)(async (req, res) => {
    const number_of_users = await user_1.Users.countDocuments();
    const number_of_jobs = await jobs_1.Jobs.countDocuments();
    const number_of_courses = await courses_1.Courses.countDocuments();
    if (number_of_users > 0) {
        return res.json({
            message: "Data",
            data: number_of_users,
            jobs: number_of_jobs,
            courses: number_of_courses,
        });
    }
    return res.json({
        message: "No data",
    });
});
exports.user_list = (0, async_runner_1.async_runner)(async (req, res) => {
    const { name, email, page = 1, limit = 100, } = (0, express_validator_1.matchedData)(req, { locations: ["query"] });
    const filter = {};
    if (name)
        filter.user_name = { $regex: name, $options: "i" };
    if (email)
        filter.user_email = { $regex: email, $options: "i" };
    const skip = (page - 1) * limit;
    const users = await user_1.Users.find(filter)
        .skip(skip)
        .limit(Number(limit))
        .lean()
        .exec();
    const count = await user_1.Users.countDocuments(filter);
    if (users.length > 0) {
        return res.json({
            message: "Users",
            users,
            total_pages: Math.ceil(count / limit),
            current_page: Number(page),
        });
    }
    res.json({
        message: "no data",
        users: [],
    });
});
exports.jobs_list = (0, async_runner_1.async_runner)(async (req, res) => {
    const { title, page = 1, limit = 100, } = (0, express_validator_1.matchedData)(req, { locations: ["query"] });
    const filter = {};
    if (title)
        filter.job_title = { $regex: title, $options: "i" };
    // if (email) filter.job_title = { $regex: email, $options: "i" };
    const skip = (page - 1) * limit;
    const jobs = await jobs_1.Jobs.find(filter)
        .skip(skip)
        .limit(Number(limit))
        .lean()
        .exec();
    const count = await jobs_1.Jobs.countDocuments(filter);
    if (jobs.length > 0) {
        return res.json({
            message: "Jobs",
            jobs,
            total_pages: Math.ceil(count / limit),
            current_page: Number(page),
        });
    }
    res.json({
        message: "no data",
        jobs: [],
    });
});
exports.course_list = (0, async_runner_1.async_runner)(async (req, res) => {
    const { title, page = 1, limit = 100, } = (0, express_validator_1.matchedData)(req, { locations: ["query"] });
    const filter = {};
    if (title)
        filter.job_title = { $regex: title, $options: "i" };
    const skip = (page - 1) * limit;
    const courses = await courses_1.Courses.find(filter)
        .skip(skip)
        .limit(Number(limit))
        .lean()
        .exec();
    const count = await courses_1.Courses.countDocuments(filter);
    if (courses.length > 0) {
        return res.json({
            message: "Courses",
            courses,
            total_pages: Math.ceil(count / limit),
            current_page: Number(page),
        });
    }
    res.json({
        message: "no data",
        courses: [],
    });
});
const delete_existing_otp = async (email) => user_1.Otp.findOneAndDelete({ email });
exports.create_otp_for_password_reset = (0, async_runner_1.async_runner)(async (req, res) => {
    const { email } = (0, express_validator_1.matchedData)(req);
    delete_existing_otp(email);
    const check_account = await user_1.Users.findOne({ email: email });
    if (check_account) {
        const code = (0, crypt_1.generateDigitOTP)(6);
        const set_otp = new user_1.Otp({
            otp: code,
            email: email,
        });
        const save_code = await set_otp.save();
        //Add otp email here...
        await (0, mailer_1.reset_otp)(email, code);
        return res.json({
            message: save_code ? `Please check your mail for OTP` : "please retry",
        });
    }
    return res.json({
        message: "invalid details",
    });
});
exports.verify_otp = (0, async_runner_1.async_runner)(async (req, res) => {
    const { otp, email } = (0, express_validator_1.matchedData)(req);
    const confirm_check = await user_1.Otp.findOne({ otp });
    if (confirm_check && confirm_check.email === email) {
        const combined = (0, randomtext_1.generateRandomParagraph)();
        const reset_token = jsonwebtoken_1.default.sign({
            email,
            text: combined,
            otp,
        }, key, { expiresIn: "10days" });
        return res.json({
            message: `reset_token ${reset_token}`,
        });
    }
    return res.json({
        message: "invalid details",
    });
});
exports.set_new_pass = (0, async_runner_1.async_runner)(async (req, res) => {
    const { new_pass } = (0, express_validator_1.matchedData)(req);
    const email = req.params.email;
    const salt = await bcrypt_1.default.genSalt(10);
    const hashed = await bcrypt_1.default.hash(new_pass, salt);
    const update_user_pass = await user_1.Users.updateOne({ email: email }, { $set: { pass_word: hashed } }, { new: true });
    return res.json({
        message: update_user_pass
            ? "Password updated"
            : "please retry after some mins",
    });
});
//# sourceMappingURL=admin.js.map