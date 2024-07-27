import express, { Router } from "express";
import japa from "./japa";

const router = express.Router();

export default (): express.Router => {
  japa(router);
  return router;
};
