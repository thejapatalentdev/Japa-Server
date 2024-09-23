import { Schema, model } from "mongoose";
const job_schema = new Schema({
  job_title: { type: String },
  location: { type: String },
  job_type: { type: String },
  company_name: { type: String },
  technology: [],
  min_salary: { type: Number },
  max_salary: { type: Number },
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
  skills: { type: String },
});
const job_type_schema = new Schema({
  name: { type: String },
});

const job_category_schema = new Schema({
  name: { type: String },
});
const Technologies_used = new Schema({
  name: { type: String },
});
const yoe = new Schema({
  name: { type: String },
});

const Jobs = model("Jobs", job_schema);
const Job_type = model("Job_type", job_type_schema);
const Job_category = model("Job_category", job_category_schema);
const Technologies = model("Job_technologies", Technologies_used);
const Years_of_experience = model("years_of_experience", yoe);

export { Jobs, Job_category, Job_type, Technologies, Years_of_experience };
