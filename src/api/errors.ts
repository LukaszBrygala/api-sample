import { Response } from "express";

export function sendError(res: Response, statusCode: number, message: string) {
  res.status(statusCode);
  res.send(message);
}

export function sendValidationError(res: Response, message: string) {
  sendError(res, 400, `invalid argument: ${message}`);
}
