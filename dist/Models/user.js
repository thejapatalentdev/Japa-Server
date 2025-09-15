"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Applications = exports.Talents = exports.Otp = exports.Users = void 0;
const mongoose_1 = require("mongoose");
const user_details_schema = new mongoose_1.Schema({
    first_name: { type: String },
    last_name: { type: String },
    pass_word: { type: String },
    bio: { type: String },
    country: { type: String },
    email: { type: String },
    phone_number: { type: String },
    gender: { type: String },
    profile_image_url: { type: String },
    academic_details: {
        school_name: { type: String },
        year_of_graduation: { type: Date },
        grade: { type: String },
    },
    registration_date: { type: Date },
    //Incase japa desides to use auth0
    auth_o_id: { type: String },
    job_status: {
        employment_status: { type: String },
        got_job_from_japa: { type: String },
        present_employer: { type: String },
        previous_employers: [
            {
                name: { type: String },
                start_year: { type: Date },
                end_date: { type: Date },
            },
        ],
    },
    additional_certification: [
        {
            name: { type: String },
            certificate_link: { type: String },
        },
    ],
});
const otp_schema = new mongoose_1.Schema({
    email: { type: String },
    otp: { type: String },
});
const talents = new mongoose_1.Schema({
    full_name: { type: String },
    current_skills: { type: String },
    course_of_choice: { type: String },
    resume_link: { type: String },
    date: { type: Date },
});
const apply_for_jobs = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Types.ObjectId, ref: "Users" },
    job_id: [{ type: mongoose_1.Types.ObjectId, ref: "Jobs", required: true }],
});
const Users = (0, mongoose_1.model)("Users", user_details_schema);
exports.Users = Users;
const Otp = (0, mongoose_1.model)("Otps", otp_schema);
exports.Otp = Otp;
const Talents = (0, mongoose_1.model)("Talents", talents);
exports.Talents = Talents;
const Applications = (0, mongoose_1.model)("Applications", apply_for_jobs);
exports.Applications = Applications;
//# sourceMappingURL=user.js.map