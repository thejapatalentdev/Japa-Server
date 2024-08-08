import { Request, Response } from "express";
import { async_runner } from "../middlewares/async_runner";
import { matchedData } from "express-validator";
import { Users } from "../Models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateRandomParagraph } from "../Functions/randomtext";
import config from "../Config/config";
import { Job_category, Job_type, Jobs } from "../Models/jobs";
import { Courses } from "../Models/courses";
const key = config.key;

//Login is as a user
export const login_user = async_runner(async (req: Request, res: Response) => {
  const { email, password } = matchedData(req);
  const get_user = await Users.findOne({ email: email });
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

//find jobs
export const find_jobs = async_runner(async (req: Request, res: Response) => {
  const {
    title,
    salary,
    type,
    location,
    technology,
    page = 1,
    limit = 10,
  } = matchedData(req);
  const filter: any = {};
  if (title) filter.job_title = { $regex: title, $options: "i" };
  if (salary) filter.salary_range = { $regex: salary, $options: "i" };
  if (type) filter.job_type = { $regex: type, $options: "i" };
  if (location) filter.location = { $regex: location, $options: "i" };
  if (technology)
    filter.technology = { $in: (technology as string).split(",") };
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

export const list_jobtype = async_runner(
  async (req: Request, res: Response) => {
    const job_types = await Job_type.find();
    if (job_types.length > 0) {
      return res.json({
        message: "Job types",
        data: job_types,
      });
    }
  }
);

export const list_category = async_runner(
  async (req: Request, res: Response) => {
    const job_categories = await Job_category.find();
    if (job_categories.length > 0) {
      return res.json({
        message: "Job categories",
        data: job_categories,
      });
    }
  }
);

export const find_job_by_id = async_runner(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const job = await Jobs.findById({ _id: id });
    if (job) {
      return res.json({
        message: "job",
        data: job,
      });
    }
    return res.json({
      message: "invalid id",
    });
  }
);

export const find_courses_by_id = async_runner(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const course = await Courses.findById({ _id: id });
    if (course) {
      return res.json({
        message: "Course",
        data: course,
      });
    }
    return res.json({
      message: "invalid id",
    });
  }
);

//find courses......
export const find_courses = async_runner(
  async (req: Request, res: Response) => {
    const { title, page = 1, limit = 10 } = matchedData(req);
    const filter: any = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    const skip = (page - 1) * limit;
    const courses = await Courses.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .exec();
    const count = await Courses.countDocuments(filter);
    if (courses.length > 0) {
      return res.json({
        message: "Courses",
        courses: courses,
        total_pages: Math.ceil(count / limit),
        current_page: Number(page),
      });
    }
    res.json({
      message: [],
    });
  }
);
