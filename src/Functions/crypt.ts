import bcrypt from "bcrypt";
import config from "../Config/config";

export const hash_pass = async (pass: string) => {
  const key = Number(config.salt);
  const salt_now = await bcrypt.genSalt(key);
  const hased = await bcrypt.hash(pass, salt_now);
  return hased;
};
