"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.job_applied_for = exports.apply_for_coaching = exports.apply_for_jobs = exports.find_courses = exports.find_courses_by_id = exports.find_job_by_id = exports.list_category = exports.list_jobtype = exports.find_jobs = exports.login_user = void 0;
const async_runner_1 = require("../middlewares/async_runner");
const express_validator_1 = require("express-validator");
const user_1 = require("../Models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const randomtext_1 = require("../Functions/randomtext");
const config_1 = __importDefault(require("../Config/config"));
const jobs_1 = require("../Models/jobs");
const courses_1 = require("../Models/courses");
const mongoose_1 = __importDefault(require("mongoose"));
const key = config_1.default.key;
//Login is as a user
exports.login_user = (0, async_runner_1.async_runner)(async (req, res) => {
    const { email, password } = (0, express_validator_1.matchedData)(req);
    const get_user = await user_1.Users.findOne({ email: email });
    if (get_user) {
        const pass = get_user.pass_word;
        const compare_pass = await bcrypt_1.default.compare(password, pass);
        if (compare_pass) {
            const combined = (0, randomtext_1.generateRandomParagraph)();
            const auth_token = jsonwebtoken_1.default.sign({
                first_name: get_user.first_name,
                text: combined,
                _id: get_user._id,
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
//find jobs
exports.find_jobs = (0, async_runner_1.async_runner)(async (req, res) => {
    const { title, salary, type, location, technology, category, experience, page = 1, limit = 1000, } = (0, express_validator_1.matchedData)(req, { locations: ["query"] });
    const filter = {};
    if (title)
        filter.job_title = { $regex: title, $options: "i" };
    if (experience)
        filter.experience = { $regex: experience, $options: "i" };
    if (category)
        filter.jcategory = { $regex: category, $options: "i" };
    if (salary)
        filter.salary_range = { $regex: salary, $options: "i" };
    if (type)
        filter.job_type = { $regex: type, $options: "i" };
    if (location)
        filter.location = { $regex: location, $options: "i" };
    if (technology)
        filter.technology = { $in: technology.split(",") };
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
exports.list_jobtype = (0, async_runner_1.async_runner)(async (req, res) => {
    const job_types = await jobs_1.Job_type.find();
    // const remote_jobs
    if (job_types.length > 0) {
        return res.json({
            message: "Job types",
            data: job_types,
        });
    }
    return res.json({
        message: "No job types",
        job_types: [],
    });
});
exports.list_category = (0, async_runner_1.async_runner)(async (req, res) => {
    const job_categories = await jobs_1.Job_category.find();
    if (job_categories.length > 0) {
        return res.json({
            message: "Job categories",
            data: job_categories,
        });
    }
    return res.json({
        message: "No categories",
        job_categories: [],
    });
});
exports.find_job_by_id = (0, async_runner_1.async_runner)(async (req, res) => {
    const id = req.params.id;
    const job = await jobs_1.Jobs.findById({ _id: id }).lean();
    if (job) {
        return res.json({
            message: "job",
            data: job,
        });
    }
    return res.json({
        message: "invalid id",
    });
});
exports.find_courses_by_id = (0, async_runner_1.async_runner)(async (req, res) => {
    const id = req.params.id;
    const course = await courses_1.Courses.findById({ _id: id });
    if (course) {
        return res.json({
            message: "Course",
            data: course,
        });
    }
    return res.json({
        message: "invalid id",
    });
});
//find courses......
exports.find_courses = (0, async_runner_1.async_runner)(async (req, res) => {
    const { title, page = 1, limit = 1000 } = (0, express_validator_1.matchedData)(req);
    const filter = {};
    if (title)
        filter.title = { $regex: title, $options: "i" };
    const skip = (page - 1) * limit;
    const courses = await courses_1.Courses.find(filter)
        .skip(skip)
        .limit(Number(limit))
        .exec();
    const count = await courses_1.Courses.countDocuments(filter);
    if (courses.length > 0) {
        return res.json({
            message: "Courses",
            courses: courses,
            total_pages: Math.ceil(count / limit),
            current_page: Number(page),
        });
    }
    res.json({
        message: [],
    });
});
exports.apply_for_jobs = (0, async_runner_1.async_runner)(async (req, res) => {
    const { user_id, job_id } = req.body;
    const jobs = await user_1.Applications.findOne({ user_id })
        .lean()
        .countDocuments();
    const applied = await user_1.Applications.findOne({
        user_id,
        job_id: { $in: [job_id] },
    }).lean();
    if (applied) {
        return res.json({ message: "already applied" });
    }
    if (jobs > 0) {
        const applications = await user_1.Applications.findOneAndUpdate({ user_id }, { $push: { job_id } }, { new: true });
        return res.json({
            message: applications ? "saved" : "retry",
        });
    }
    else {
        const applications = new user_1.Applications({
            user_id,
            job_id,
        });
        const saver = await applications.save();
        return res.json({
            message: saver ? "saved" : "retry",
        });
    }
    // if (applied) {
    //   return res.json({
    //     message: "you already applied for this job o!",
    //   });
    // }
    // const apply_now = new Applications({
    //   job_id,
    //   user_id,
    // });
    // const saved = await apply_now.save();
    // return res.json({
    //   message: saved ? "Thanks for applying" : "Please retry",
    // });
});
exports.apply_for_coaching = (0, async_runner_1.async_runner)(async (req, res) => {
    const { full_name, current_skills, course_of_choice, resume_link } = req.body;
    const apply_now = new user_1.Talents({
        full_name,
        current_skills,
        course_of_choice,
        resume_link,
    });
    const saved = await apply_now.save();
    return res.json({
        message: saved ? "Thanks for applying" : "Please retry",
    });
});
//This line get the jobs
exports.job_applied_for = (0, async_runner_1.async_runner)(async (req, res) => {
    const { user_id } = req.query;
    //@ts-ignore
    const _id = new mongoose_1.default.Types.ObjectId(user_id);
    const applied_for = await user_1.Applications.find({ user_id: user_id })
        .populate("job_id")
        .lean();
    //@ts-ignore
    if (applied_for) {
        return res.json({
            message: "Jobs applied for",
            jobs: applied_for,
        });
    }
    return res.json({
        message: "No applications found",
        jobs: [],
    });
});
//# sourceMappingURL=user.js.map