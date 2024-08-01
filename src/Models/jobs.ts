import { Schema, model } from "mongoose";
const job_schema = new Schema({
  job_title: { type: String },
  location: { type: String },
  job_type: { type: String },
  company_name: { type: String },
  technology: [],
  salary_range: { type: Number },
  experience: { type: String },
  date_posted: { type: Date },
  about: { type: String },
  what_you_will_be_doing: { type: String },
  what_we_are_lookin_for: { type: String },
  nice_to_have: { type: String },
  skills: { type: String },
  ideal_candidate: { type: String },
  applicants: { type: Number },
  link: { type: String },
  payment_type: { type: String },
  currency: { type: String },
});

const Jobs = model("Jobs", job_schema);

export { Jobs };
