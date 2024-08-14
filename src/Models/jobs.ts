import { Schema, model } from "mongoose";
const job_schema = new Schema({
  job_title: { type: String },
  location: { type: String },
  job_type: { type: String },
  company_name: { type: String },
  technology: [],
  salary_range: { ammount: Number, currency: String },
  experience: { type: String },
  date_posted: { type: Date },
  about: { type: String },
  what_you_will_be_doing: { type: String },
  what_we_are_lookin_for: { type: String },
  nice_to_have: { type: String },
  category: { type: String },
  ideal_candidate: { type: String },
  applicants: { type: Number },
  link: { type: String },
  payment_type: { type: String },
  currency: { type: String },
});
const job_type_schema = new Schema({
  name: { type: String },
});

const job_category_schema = new Schema({
  name: { type: String },
});

const Jobs = model("Jobs", job_schema);
const Job_type = model("Tob_type", job_type_schema);
const Job_category = model("Job_category", job_category_schema);

export { Jobs, Job_category, Job_type };
