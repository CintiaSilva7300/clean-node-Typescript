import { JwtAdapter } from "./jwt-adapter";
import jwt from "jsonwebtoken";
import { rejects } from "assert";

jest.mock("jsonwebtoken", () => ({
  async sign(): Promise<string> {
    return new Promise((resolve) => resolve("any_token"));
  },
}));

const makeSut = (): JwtAdapter => {
  return new JwtAdapter("secret");
};

describe("jWT Adapter", () => {
  test("should call sign with correct values", async () => {
    const sut = makeSut();
    const signSpy = jest.spyOn(jwt, "sign");
    await sut.encrypt("any_id");
    expect(signSpy).toHaveBeenCalledWith({ id: "any_id" }, "secret");
  });

  test("should return a token on sign success", async () => {
    const sut = makeSut();
    const acessToken = await sut.encrypt("any_id");
    expect(acessToken).toBe("any_token");
  });

  test("should throws if sign throws", async () => {
    const sut = makeSut();
    jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.encrypt("any_id");
    await expect(promise).rejects.toThrow();
  });
});
