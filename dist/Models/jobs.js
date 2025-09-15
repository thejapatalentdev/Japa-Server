"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Years_of_experience = exports.Technologies = exports.Job_type = exports.Job_category = exports.Jobs = void 0;
const mongoose_1 = require("mongoose");
const job_schema = new mongoose_1.Schema({
    job_title: { type: String },
    location: { type: String },
    job_type: { type: String },
    company_name: { type: String },
    // technology: [],
    // min_salary: { type: Number },
    // max_salary: { type: Number },
    salary_range: { ammount: Number, currency: String },
    experience: { type: String },
    date_posted: { type: Date },
    about: { type: String },
    what_you_will_be_doing: { type: String },
    what_we_are_lookin_for: { type: String },
    // nice_to_have: { type: String },
    category: { type: String },
    // ideal_candidate: { type: String },
    applicants: { type: Number },
    link: { type: String },
    payment_type: { type: String },
    currency: { type: String },
    // skills: { type: String },
});
const job_type_schema = new mongoose_1.Schema({
    name: { type: String },
});
const job_category_schema = new mongoose_1.Schema({
    name: { type: String },
});
const Technologies_used = new mongoose_1.Schema({
    name: { type: String },
});
const yoe = new mongoose_1.Schema({
    name: { type: String },
});
const Jobs = (0, mongoose_1.model)("Jobs", job_schema);
exports.Jobs = Jobs;
const Job_type = (0, mongoose_1.model)("Job_type", job_type_schema);
exports.Job_type = Job_type;
const Job_category = (0, mongoose_1.model)("Job_category", job_category_schema);
exports.Job_category = Job_category;
const Technologies = (0, mongoose_1.model)("Job_technologies", Technologies_used);
exports.Technologies = Technologies;
const Years_of_experience = (0, mongoose_1.model)("years_of_experience", yoe);
exports.Years_of_experience = Years_of_experience;
//# sourceMappingURL=jobs.js.map