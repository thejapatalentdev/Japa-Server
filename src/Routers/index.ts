import express, { Router } from "express";
import japa from "./japa";
import register from "./registration";

const router = express.Router();

export default (): express.Router => {
  japa(router);
  register(router);
  return router;
};
