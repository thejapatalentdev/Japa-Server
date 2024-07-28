import { Request, Response } from "express";
import { async_runner } from "../middlewares/async_runner";
import { matchedData } from "express-validator";
import { Users } from "../Models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateRandomParagraph } from "../Functions/randomtext";
import config from "../Config/config";
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
