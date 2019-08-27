import { Withdrawer } from "./services";

import { NoteUnavailableException, InvalidArgumentException } from "./errors";

export default class CashMachine implements Withdrawer {
  notes: number[];

  constructor(notes: number[] = [100, 50, 20, 10]) {
    this.notes = [...notes];
    this.notes.sort((a, b) => b - a);
  }

  withdraw(amount: number): number[] {
    if (!amount) {
      return [];
    }

    if (!Number.isInteger(amount) || amount < 0) {
      throw new InvalidArgumentException("amount should be a positive integer");
    }

    let remaining = amount;
    const result = [];

    for (let i = 0; i < this.notes.length; i += 1) {
      const note = this.notes[i];

      while (remaining >= note) {
        remaining -= note;
        result.push(note);
      }

      if (remaining === 0) {
        return result;
      }
    }

    throw new NoteUnavailableException();
  }
}
