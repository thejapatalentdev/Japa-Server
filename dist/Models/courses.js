"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Courses = void 0;
const mongoose_1 = require("mongoose");
const courses_schema = new mongoose_1.Schema({
    title: { type: String },
    about: {
        details: String,
        ratings: "Number",
        level: String,
        schedule: String,
    },
    course_outline: { type: String },
    date_posted: { type: Date },
    over_view: {
        whocan: String,
        how: String,
        lesson_count: Number,
        certification: String,
        platform: String,
    },
    link: { type: String },
    requirements: { type: String },
});
const Courses = (0, mongoose_1.model)("Course", courses_schema);
exports.Courses = Courses;
//# sourceMappingURL=courses.js.map