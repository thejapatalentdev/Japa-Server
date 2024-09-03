import { Request, Response } from "express";
import { async_runner } from "../middlewares/async_runner";
import { matchedData } from "express-validator";
import { Otp, Users } from "../Models/user";
import { generateDigitOTP, hash_pass } from "../Functions/crypt";
import { generateRandomParagraph } from "../Functions/randomtext";
import jwt from "jsonwebtoken";
import config from "../Config/config";
// import { welcome_email } from "../Functions/mailer";
import bcrypt from "bcrypt";
import { Admin } from "../Models/admin";
const key = config.key;

const delete_existing_otp = async (email: string) =>
  Otp.findOneAndDelete({ email });

export const register_user = async_runner(
  async (req: Request, res: Response) => {
    const {
      first_name,
      last_name,
      pass_word,
      bio,
      country,
      email,
      gender,
      phone_number,
      profile_image_url,
      academic_details,
      auth_o_id,
      job_status,
      additional_certification,
    } = matchedData(req);
    const existing_user = await Users.findOne({
      $or: [{ email }],
    });
    if (existing_user) {
      return res.json({
        message: "Email already taken",
      });
    }
    const encrypted = await hash_pass(pass_word);
    const new_user = new Users({
      first_name,
      last_name,
      pass_word: encrypted,
      bio,
      country,
      email,
      gender,
      phone_number,
      profile_image_url,
      academic_details,
      auth_o_id,
      job_status,
      additional_certification,
      registration_date: Date.now(),
    });
    const save_details = await new_user.save();
    // await welcome_email(email);
    return res.json({
      message: save_details ? "Account created" : "Please check your network",
    });
  }
);

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
      return res.json({
        message: save_code
          ? `Please check your mail for OTP ${code}`
          : "please retry",
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

//Register admin.........
export const create_admin = async_runner(
  async (req: Request, res: Response) => {
    const {
      first_name,
      last_name,
      pass_word,
      email,
      gender,
      phone_number,
      profile_image_url,
      rights,
    } = matchedData(req);
    const existing_user = await Admin.findOne({
      $or: [{ email }, { phone_number: phone_number }],
    });
    if (existing_user) {
      return res.json({
        message: "Email and Phone number already taken",
      });
    }
    const encrypted = await hash_pass(pass_word);
    const new_user = new Admin({
      first_name,
      last_name,
      pass_word: encrypted,
      email,
      gender,
      phone_number,
      profile_image_url,
      rights: "super_admin",

      registration_date: Date.now(),
    });
    const save_details = await new_user.save();
    // await welcome_email(email);
    return res.json({
      message: save_details ? "Account created" : "Please check your network",
    });
  }
);
