import * as request from "supertest";
import createApp from "./createApp";
import { Withdrawer } from "../domain/services";
import {
  InvalidArgumentException,
  NoteUnavailableException
} from "../domain/errors";

class WithdrawerMock implements Withdrawer {
  withdraw = jest.fn();
}

describe("API misc", () => {
  test("GET /unknown/path", async () => {
    const app = createApp(new WithdrawerMock());

    const response = await request(app).get("/unknown/path");

    expect(response.status).toBe(404);
    expect(response.text).toEqual("not found");
  });
});

describe("GET /withdraw/:amount", () => {
  test("returns validation error when amount is not a number", async () => {
    const app = createApp(new WithdrawerMock());

    const response = await request(app).get("/withdraw/abc");

    expect(response.status).toBe(400);
    expect(response.text).toEqual(
      "invalid argument: amount should be a number"
    );
  });

  test("returns validation error as returned by Withdrawer", async () => {
    const withdrawerMock = new WithdrawerMock();
    withdrawerMock.withdraw.mockImplementationOnce(() => {
      throw new InvalidArgumentException("test error message");
    });

    const app = createApp(withdrawerMock);

    const response = await request(app).get("/withdraw/100");

    expect(response.status).toBe(400);
    expect(response.text).toEqual("invalid argument: test error message");
  });

  test("returns validation error when Withdrawer throws NoteUnavailableException", async () => {
    const withdrawerMock = new WithdrawerMock();
    withdrawerMock.withdraw.mockImplementationOnce(() => {
      throw new NoteUnavailableException();
    });

    const app = createApp(withdrawerMock);

    const response = await request(app).get("/withdraw/100");

    expect(response.status).toBe(400);
    expect(response.text).toEqual(
      "invalid argument: amount can not be withdrawn with notes available"
    );
  });

  test("returns notes as computed by Withdrawer", async () => {
    const withdrawerMock = new WithdrawerMock();
    withdrawerMock.withdraw.mockReturnValueOnce([100, 100]);

    const app = createApp(withdrawerMock);

    const response = await request(app).get("/withdraw/200");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([100, 100]);
  });
});
