import bcrypt from "bcrypt";
import config from "../Config/config";

export const hash_pass = async (pass: string) => {
  const key = Number(config.salt);
  const salt_now = await bcrypt.genSalt(key);
  const hased = await bcrypt.hash(pass, salt_now);
  return hased;
};

//OTP
export const generateDigitOTP = (length: number) => {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }

  return otp;
};
