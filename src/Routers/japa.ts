import express from "express";
import { service_tester } from "../Controllers/japa";

export default (router: express.Router) => {
  router.get("/", service_tester);
};
