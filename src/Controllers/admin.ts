import { Request, Response } from "express";
import { async_runner } from "../middlewares/async_runner";
import jwt from "jsonwebtoken";
import config from "../Config/config";
import { matchedData, param } from "express-validator";
import { generateRandomParagraph } from "../Functions/randomtext";
import { Admin } from "../Models/admin";
import bcrypt from "bcrypt";
import { Job_category, Job_type, Jobs } from "../Models/jobs";
import { Courses } from "../Models/courses";
import { Users } from "../Models/user";

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
      about,
      what_you_will_be_doing,
      what_we_are_lookin_for,
      nice_to_have,
      skills,
      category,
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
      category,
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

export const post_job_category = async_runner(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const role = req.params.role;
    if (role === "admin" || role === "super_admin") {
      const save_category = new Job_category({
        name,
      });
      const save_now = await save_category.save();
      return res.json({
        message: save_now ? "saved" : "not saved",
      });
    }
    return res.json({
      message: "you dont have right",
    });
  }
);

export const post_job_type = async_runner(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const role = req.params.role;
    if (role === "admin" || role === "super_admin") {
      const save_type = new Job_type({
        name,
      });
      const save_now = await save_type.save();
      return res.json({
        message: save_now ? "saved" : "not saved",
      });
    }
    return res.json({
      message: "You dont have right",
    });
  }
);

export const post_courses = async_runner(
  async (req: Request, res: Response) => {
    const role = req.params.role;
    if (role === "admin" || role === "super_admin") {
      const { title, about, course_outline, over_view, link, requirements } =
        matchedData(req);
      const save_couses = new Courses({
        title,
        about,
        link,
        course_outline,
        over_view,
        requirements,
        date_posted: Date.now(),
      });
      const saved_course = await save_couses.save();
      return res.json({
        message: saved_course ? "course saved" : "please retry",
      });
    }
    return res.json({
      message: "you have no rights",
    });
  }
);

export const stats = async_runner(async (req: Request, res: Response) => {
  const number_of_users = await Users.countDocuments();
  const number_of_jobs = await Jobs.countDocuments();
  const number_of_courses = await Courses.countDocuments();

  if (number_of_users > 0) {
    return res.json({
      message: "Data",
      data: number_of_users,
      jobs: number_of_jobs,
      courses: number_of_courses,
    });
  }
  return res.json({
    message: "No data",
  });
});

export const user_list = async_runner(async (req: Request, res: Response) => {
  const {
    name,
    email,
    page = 1,
    limit = 10,
  } = matchedData(req, { locations: ["query"] });
  const filter: any = {};
  if (name) filter.job_title = { $regex: name, $options: "i" };
  if (email) filter.job_title = { $regex: email, $options: "i" };
  const skip = (page - 1) * limit;
  const users = await Users.find(filter)
    .skip(skip)
    .limit(Number(limit))
    .lean()
    .exec();
  const count = await Jobs.countDocuments(filter);
  if (users.length > 0) {
    return res.json({
      message: "Users",
      users,
      total_pages: Math.ceil(count / limit),
      current_page: Number(page),
    });
  }
  res.json({
    message: "no data",
    jobs: [],
  });
});

export const course_list = async_runner(async (req: Request, res: Response) => {
  const {
    title,
    page = 1,
    limit = 10,
  } = matchedData(req, { locations: ["query"] });
  const filter: any = {};
  if (title) filter.job_title = { $regex: title, $options: "i" };
  const skip = (page - 1) * limit;
  const users = await Courses.find(filter)
    .skip(skip)
    .limit(Number(limit))
    .lean()
    .exec();
  const count = await Courses.countDocuments(filter);
  if (users.length > 0) {
    return res.json({
      message: "Courses",
      users,
      total_pages: Math.ceil(count / limit),
      current_page: Number(page),
    });
  }
  res.json({
    message: "no data",
    jobs: [],
  });
});
