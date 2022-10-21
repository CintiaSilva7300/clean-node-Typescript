import * as bcrypt from "bcrypt";
import { BcriptAdapter } from "./bcript-adapter";

describe("Bcrypt Adapter", () => {
  test("Shoult call bcrypt with correct value", async () => {
    const salt = 12;
    const sut = new BcriptAdapter(12);
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("any_value");
    expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
  });
});
