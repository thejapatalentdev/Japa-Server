import mongoose from "mongoose";
export const connect_now = async (connection: string) => {
  try {
    await mongoose.connect(connection);
    console.log("Connected");
  } catch (er) {
    console.log("Some bad", er);
  }
};
