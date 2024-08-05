import { Request, Response } from "express";

export const service_tester = async (req: Request, res: Response) => {
  return res.json({
    message: "Japa service is up and running!",
  });
};
