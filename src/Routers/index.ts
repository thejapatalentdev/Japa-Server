import express, { Router } from "express";
import japa from "./japa";
import register from "./registration";
import users from "./users";
import admin from "./admin";

const router = express.Router();

export default (): express.Router => {
  japa(router);
  register(router);
  users(router);
  admin(router);
  return router;
};
