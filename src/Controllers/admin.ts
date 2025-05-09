import { Request, Response } from "express";
import { async_runner } from "../middlewares/async_runner";
import jwt from "jsonwebtoken";
import config from "../Config/config";
import { matchedData, param } from "express-validator";
import { generateRandomParagraph } from "../Functions/randomtext";
import { Admin } from "../Models/admin";
import bcrypt from "bcrypt";
import {
  Job_category,
  Job_type,
  Jobs,
  Technologies,
  Years_of_experience,
} from "../Models/jobs";
import { Courses } from "../Models/courses";
import { Talents, Users, Otp } from "../Models/user";
import { generateDigitOTP } from "../Functions/crypt";
import { reset_otp } from "../Functions/mailer";

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

export const talent_list = async_runner(async (req: Request, res: Response) => {
  const {
    name,
    page = 1,
    limit = 100,
  } = matchedData(req, { locations: ["query"] });
  const filter: any = {};
  if (name) filter.full_name = { $regex: name, $options: "i" };
  // if (email) filter.user_email = { $regex: email, $options: "i" };
  const skip = (page - 1) * limit;
  const talents = await Talents.find(filter)
    .skip(skip)
    .limit(Number(limit))
    .lean()
    .exec();
  const count = await Users.countDocuments(filter);
  if (talents.length > 0) {
    return res.json({
      message: "Users",
      talents,
      total_pages: Math.ceil(count / limit),
      current_page: Number(page),
    });
  }
  res.json({
    message: "no data",
    talents: [],
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

export const edit_jobs = async_runner(async (req: Request, res: Response) => {
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
      job_id,
    } = matchedData(req);
    const update_job = await Jobs.findByIdAndUpdate(
      job_id,
      {
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
      },
      { new: true }
    );
    const saved_job = await update_job.save();
    return res.json({
      message: saved_job ? "job saved" : "please retry",
    });
  }
  return res.json({
    message: "you have no rights",
  });
});

export const delete_jobs = async_runner(async (req: Request, res: Response) => {
  const { _id } = req.body;
  const delete_one = await Jobs.deleteOne({ _id });
  return res.json({
    message: delete_one ? "Deleted" : "please retry",
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

export const post_technology = async_runner(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const role = req.params.role;
    if (role === "admin" || role === "super_admin") {
      const save_type = new Technologies({
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

export const post_years_of_experience = async_runner(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const role = req.params.role;
    if (role === "admin" || role === "super_admin") {
      const save_type = new Years_of_experience({
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

export const list_job_cats = async_runner(
  async (req: Request, res: Response) => {
    const job_cats = await Job_category.find().lean();
    if (job_cats.length > 0) {
      return res.json({
        message: "Job categories",
        categories: job_cats,
      });
    }
    return res.json({
      message: "No categories",
      categories: [],
    });
  }
);

export const list_job_type = async_runner(
  async (req: Request, res: Response) => {
    const job_type = await Job_type.find().lean();
    if (job_type.length > 0) {
      return res.json({
        message: "Job types",
        type: job_type,
      });
    }
    return res.json({
      message: "No categories",
      type: [],
    });
  }
);

export const list_technologies = async_runner(
  async (req: Request, res: Response) => {
    const technologies = await Technologies.find().lean();
    if (technologies.length > 0) {
      return res.json({
        message: "Technologies",
        tech: technologies,
      });
    }
    return res.json({
      message: "No categories",
      tech: [],
    });
  }
);

export const list_yoe = async_runner(async (req: Request, res: Response) => {
  const years_of_experience = await Years_of_experience.find().lean();
  if (years_of_experience.length > 0) {
    return res.json({
      message: "Years of experience",
      type: years_of_experience,
    });
  }
});

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

export const edit_courses = async_runner(
  async (req: Request, res: Response) => {
    const role = req.params.role;
    if (role === "admin" || role === "super_admin") {
      const {
        title,
        about,
        course_outline,
        over_view,
        link,
        requirements,
        course_id,
      } = matchedData(req);
      const update_course = await Courses.findByIdAndUpdate(
        course_id,
        {
          title,
          about,
          link,
          course_outline,
          over_view,
          requirements,
          date_posted: Date.now(),
        },
        { new: true }
      );

      return res.json({
        message: update_course ? "course saved" : "please retry",
      });
    }
    return res.json({
      message: "you have no rights",
    });
  }
);

export const delete_course = async_runner(
  async (req: Request, res: Response) => {
    const { _id } = req.body;
    const delete_one = await Courses.deleteOne({ _id });
    return res.json({
      message: delete_one ? "Deleted" : "please retry",
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
    limit = 100,
  } = matchedData(req, { locations: ["query"] });
  const filter: any = {};
  if (name) filter.user_name = { $regex: name, $options: "i" };
  if (email) filter.user_email = { $regex: email, $options: "i" };
  const skip = (page - 1) * limit;
  const users = await Users.find(filter)
    .skip(skip)
    .limit(Number(limit))
    .lean()
    .exec();
  const count = await Users.countDocuments(filter);
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
    users: [],
  });
});

export const jobs_list = async_runner(async (req: Request, res: Response) => {
  const {
    title,
    page = 1,
    limit = 100,
  } = matchedData(req, { locations: ["query"] });
  const filter: any = {};
  if (title) filter.job_title = { $regex: title, $options: "i" };
  // if (email) filter.job_title = { $regex: email, $options: "i" };
  const skip = (page - 1) * limit;
  const jobs = await Jobs.find(filter)
    .skip(skip)
    .limit(Number(limit))
    .lean()
    .exec();
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
    message: "no data",
    jobs: [],
  });
});

export const course_list = async_runner(async (req: Request, res: Response) => {
  const {
    title,
    page = 1,
    limit = 100,
  } = matchedData(req, { locations: ["query"] });
  const filter: any = {};
  if (title) filter.job_title = { $regex: title, $options: "i" };
  const skip = (page - 1) * limit;
  const courses = await Courses.find(filter)
    .skip(skip)
    .limit(Number(limit))
    .lean()
    .exec();
  const count = await Courses.countDocuments(filter);
  if (courses.length > 0) {
    return res.json({
      message: "Courses",
      courses,
      total_pages: Math.ceil(count / limit),
      current_page: Number(page),
    });
  }
  res.json({
    message: "no data",
    courses: [],
  });
});
const delete_existing_otp = async (email: string) =>
  Otp.findOneAndDelete({ email });

export const create_otp_for_password_reset = async_runner(
  async (req: Request, res: Response) => {
    const { email } = matchedData(req);
    delete_existing_otp(email);
    const check_account = await Users.findOne({ email: email });
    if (check_account) {
      const code = generateDigitOTP(6);
      const set_otp = new Otp({
        otp: code,
        email: email,
      });
      const save_code = await set_otp.save();
      //Add otp email here...
      await reset_otp(email, code);
      return res.json({
        message: save_code ? `Please check your mail for OTP` : "please retry",
      });
    }
    return res.json({
      message: "invalid details",
    });
  }
);

export const verify_otp = async_runner(async (req: Request, res: Response) => {
  const { otp, email } = matchedData(req);
  const confirm_check = await Otp.findOne({ otp });
  if (confirm_check && confirm_check.email === email) {
    const combined = generateRandomParagraph();
    const reset_token = jwt.sign(
      {
        email,
        text: combined,
        otp,
      },
      key,
      { expiresIn: "10days" }
    );
    return res.json({
      message: `reset_token ${reset_token}`,
    });
  }
  return res.json({
    message: "invalid details",
  });
});

export const set_new_pass = async_runner(
  async (req: Request, res: Response) => {
    const { new_pass } = matchedData(req);
    const email = req.params.email;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(new_pass, salt);
    const update_user_pass = await Users.updateOne(
      { email: email },
      { $set: { pass_word: hashed } },
      { new: true }
    );
    return res.json({
      message: update_user_pass
        ? "Password updated"
        : "please retry after some mins",
    });
  }
);
