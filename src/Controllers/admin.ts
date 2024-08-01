import { Request, Response } from "express";
import { async_runner } from "../middlewares/async_runner";
import jwt from "jsonwebtoken";
import config from "../Config/config";
import { matchedData, param } from "express-validator";
import { generateRandomParagraph } from "../Functions/randomtext";
import { Admin } from "../Models/admin";
import bcrypt from "bcrypt";
import { Jobs } from "../Models/jobs";

const key = config.key;
export const login_admin = async_runner(async (req: Request, res: Response) => {
  const { email, password } = matchedData(req);
  const get_user = await Admin.findOne({ email: email });

  if (get_user) {
    const pass = get_user.pass_word;
    const compare_pass = await bcrypt.compare(password, pass);
    if (compare_pass) {
      const combined = generateRandomParagraph();
      const auth_token = jwt.sign(
        {
          first_name: get_user.first_name,
          text: combined,
          _id: get_user._id,
          right: get_user.rights,
        },
        key,
        { expiresIn: "10days" }
      );
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

export const post_jobs = async_runner(async (req: Request, res: Response) => {
  const role = req.params.role;
  if (role === "admin" || role === "super_admin") {
    const {
      job_title,
      location,
      job_type,
      company_name,
      technology,
      salary_range,
      experience,
      date_posted,
      about,
      what_you_will_be_doing,
      what_we_are_lookin_for,
      nice_to_have,
      skills,
      ideal_candidate,
      applicants,
      link,
    } = matchedData(req);
    const save_job = new Jobs({
      job_title,
      location,
      job_type,
      company_name,
      technology,
      salary_range,
      experience,
      about,
      what_you_will_be_doing,
      what_we_are_lookin_for,
      nice_to_have,
      skills,
      ideal_candidate,
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

//find jobs
export const find_jobs = async_runner(async (req: Request, res: Response) => {
  const {
    title,
    salary,
    type,
    location,
    page = 1,
    limit = 10,
  } = matchedData(req);
  const filter: any = {};
  if (title) filter.job_title = { $regex: title, $options: "i" };
  if (salary) filter.salary_range = { $regex: salary, $options: "i" };
  if (type) filter.job_type = { $regex: type, $options: "i" };
  if (location) filter.location = { $regex: location, $options: "i" };

  const skip = (page - 1) * limit;
  const jobs = await Jobs.find(filter).skip(skip).limit(Number(limit)).exec();
  const count = await Jobs.countDocuments(filter);
  if (jobs.length > 0) {
    return res.json({
      message: "Jobs",
      jobs,
      total_pages: Math.ceil(count / limit),
      current_page: Number(page),
    });
  }
  res.json({
    message: [],
  });
});
