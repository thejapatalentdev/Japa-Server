import { Schema, model } from "mongoose";
const courses_schema = new Schema({
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

const Courses = model("Course", courses_schema);
export { Courses };
