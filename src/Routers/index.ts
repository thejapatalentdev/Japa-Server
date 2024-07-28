import express, { Router } from "express";
import japa from "./japa";
import register from "./registration";
import users from "./users";

const router = express.Router();

export default (): express.Router => {
  japa(router);
  register(router);
  users(router);
  return router;
};
