import { Request, Response } from "express";
import { async_runner } from "../middlewares/async_runner";
import { matchedData } from "express-validator";
import { Users } from "../Models/user";
import { hash_pass } from "../Functions/crypt";

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
      $or: [{ email }, { phone_number: phone_number }],
    });
    if (existing_user) {
      return res.json({
        message: "Email and Phone number already taken",
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
    return res.json({
      message: save_details ? "Accounted created" : "Please check your network",
    });
  }
);
