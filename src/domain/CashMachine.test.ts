import CashMachine from "./CashMachine";

import { NoteUnavailableException, InvalidArgumentException } from "./errors";

describe("CashMachine", () => {
  [
    { amount: 30, expectedNotes: [20, 10] },
    { amount: 80, expectedNotes: [50, 20, 10] },
    { amount: 300, expectedNotes: [100, 100, 100] },
    { amount: 90, expectedNotes: [50, 20, 20] }
  ].forEach(testCase => {
    const { amount, expectedNotes } = testCase;
    test(`withdrawing ${amount} returns notes: ${expectedNotes}`, () => {
      const machine = new CashMachine();

      const actualNotes = machine.withdraw(amount);

      expect(actualNotes).toEqual(expectedNotes);
    });
  });

  [
    {
      amount: 125,
      expectedError: NoteUnavailableException,
      errorName: "NoteUnavailableException"
    },
    {
      amount: -130,
      expectedError: InvalidArgumentException,
      errorName: "InvalidArgumentException"
    }
  ].forEach(testCase => {
    const { amount, expectedError, errorName } = testCase;
    test(`withdrawing ${amount} throws ${errorName}`, () => {
      const machine = new CashMachine();

      expect(() => machine.withdraw(amount)).toThrow(expectedError);
    });
  });

  test(`withdrawing 0 returns empty array`, () => {
    const machine = new CashMachine();

    const actualNotes = machine.withdraw(0);

    expect(actualNotes).toEqual([]);
  });
});
