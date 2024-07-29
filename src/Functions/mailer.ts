import config from "../Config/config";
import * as nodemailer from "nodemailer";
const MAIL_SETTINGS = {
  host: config.smpt,
  secure: true,
  // host: config.smpt,
  port: 465,

  auth: {
    user: `${config.mail}`,
    pass: `${config.pass}`,
  },
};

let transporter = nodemailer.createTransport(MAIL_SETTINGS);
transporter.verify((error, sucess) => {
  if (error) {
    console.log("Email not sent", error);
  } else {
    console.log("ready for message");
  }
});

export const welcome_email = async (email: any) => {
  try {
    let process_email = await transporter.sendMail({
      from: config.mail,
      to: email,
      subject: "welcome to japa",
      replyTo: "",
      html: `<p>How are you today</p>`,
    });
    return process_email;
  } catch (error) {
    console.log("something is wrong", error);
  }
};
