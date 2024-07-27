import config from "../Config/config";
import * as nodemailer from "nodemailer";
const MAIL_SETTINGS = {
  //   host: "wghservers.com",
  secure: true,
  // host: "server343.web-hosting.com",
  port: 465,
  // secure: true,
  auth: {
    // user: `${config.mail}`,
    // pass: `${config.pass}`,
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
