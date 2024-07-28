import { Schema, model } from "mongoose";
const admin_details_schema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  pass_word: { type: String },
  phone_number: { type: String },
});

const Users = model("Admins", admin_details_schema);

export { Users };
