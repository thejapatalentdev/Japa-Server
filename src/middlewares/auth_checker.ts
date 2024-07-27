import { NextFunction, Request, Response } from "express";
import { async_runner } from "../middlewares/async_runner";
import jwt from "jsonwebtoken";
import config from "../Config/config";
const key = config.key;
export const check_user_auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth_user_token: any = req.header("Authorization");
  try {
    if (auth_user_token) {
      const user_token = auth_user_token.split(" ")[1];
      const analyse_token: any = jwt.verify(user_token, key);
      const my_id = analyse_token["_id"];
      const exp = analyse_token["exp"];
      if (Date.now() >= exp * 1000) {
        return res.status(401).json({
          message: "Token expired",
        });
      } else {
        res.locals.id = my_id;
        req.params.id = my_id;
        return next();
      }
    } else {
      return res.status(401).json({
        message: "you have to be logged in",
      });
    }
  } catch (ex) {
    return res.status(400).json({
      message: ex,
    });
  }
};

export const admin_check = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth_admin_token: any = req.header("Authorization");
  try {
    if (auth_admin_token) {
      const user_token = auth_admin_token.split(" ")[1];
      const analyse_token: any = jwt.verify(user_token, key);
      const my_id = analyse_token["role"];
      const exp = analyse_token["exp"];
      if (Date.now() >= exp * 1000) {
        return res.status(401).json({
          message: "Token expired",
        });
      } else {
        res.locals.role = my_id;
        req.params.role = my_id;
        // console.log(analyse_token);
        return next();
      }
    } else {
      return res.status(401).json({
        message: "You need to login",
      });
    }
  } catch (ex) {
    return res.status(400).json({
      message: ex,
    });
  }
};
