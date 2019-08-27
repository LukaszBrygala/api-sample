import * as express from "express";
import * as handlers from "./handlers";
import { sendError } from "./errors";
import { Withdrawer } from "../domain/services";

export default function createApp(withdrawer: Withdrawer) {
  const app = express();

  app.get("/withdraw/:amount", handlers.withdraw(withdrawer));

  app.use((_1, res, _2) => {
    sendError(res, 404, "not found");
  });

  return app;
}
