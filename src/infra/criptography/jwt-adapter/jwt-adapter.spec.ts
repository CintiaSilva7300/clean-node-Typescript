import { JwtAdapter } from "./jwt-adapter";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
  async sign(): Promise<string> {
    return new Promise((resolve) => resolve("any_token"));
  },
}));

describe("jWT Adapter", () => {
  test("should call sign with correct values", async () => {
    const sut = new JwtAdapter("secret");
    const signSpy = jest.spyOn(jwt, "sign");
    await sut.encrypt("any_id");
    expect(signSpy).toHaveBeenCalledWith({ id: "any_id" }, "secret");
  });

  test("should return a token on sign success", async () => {
    const sut = new JwtAdapter("secret");
    const acessToken = await sut.encrypt("any_id");
    expect(acessToken).toBe("any_token");
  });
});
