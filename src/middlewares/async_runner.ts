import express, { Request, Response, NextFunction } from "express";
//log error here............
export const async_runner = (handler: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};
