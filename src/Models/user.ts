import { Schema, Types, model } from "mongoose";
const user_details_schema = new Schema({
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

const otp_schema = new Schema({
  email: { type: String },
  otp: { type: String },
});

const talents = new Schema({
  full_name: { type: String },
  current_skills: { type: String },
  course_of_choice: { type: String },
  resume_link: { type: String },
  date: { type: Date },
});

const apply_for_jobs = new Schema({
  user_id: { type: Types.ObjectId, ref: "Users" },
  job_id: [{ type: Types.ObjectId, ref: "Jobs", required: true }],
});

const Users = model("Users", user_details_schema);
const Otp = model("Otps", otp_schema);
const Talents = model("Talents", talents);
const Applications = model("Applications", apply_for_jobs);

export { Users, Otp, Talents, Applications };
