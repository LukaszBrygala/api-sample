import { Request, Response } from "express";

import { Withdrawer } from "../domain/services";

import {
  NoteUnavailableException,
  InvalidArgumentException
} from "../domain/errors";

import { sendValidationError } from "./errors";

export function withdraw(withdrawer: Withdrawer) {
  return function handleWithdraw(req: Request, res: Response) {
    const { amount } = req.params;
    if (!amount.match(/^-?[0-9]+$/)) {
      sendValidationError(res, "amount should be a number");
      return;
    }

    try {
      const notes = withdrawer.withdraw(parseInt(amount, 10));
      res.send(notes);
    } catch (e) {
      if (e instanceof InvalidArgumentException) {
        sendValidationError(res, e.message);
        return;
      }

      if (e instanceof NoteUnavailableException) {
        sendValidationError(
          res,
          "amount can not be withdrawn with notes available"
        );
        return;
      }

      throw e;
    }
  };
}
