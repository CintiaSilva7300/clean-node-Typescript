import * as bcrypt from "bcrypt";
import { resolve } from "path";
import { BcriptAdapter } from "./bcript-adapter";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hash"));
  },
}));

describe("Bcrypt Adapter", () => {
  test("Shoult call bcrypt with correct value", async () => {
    const salt = 12;
    const sut = new BcriptAdapter(12);
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("any_value");
    expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
  });

  test("Shoult return a hash on sucess", async () => {
    const salt = 12;
    const sut = new BcriptAdapter(salt);
    const hash = await sut.encrypt("any_value");
    expect(hash).toBe("hash");
  });
});
