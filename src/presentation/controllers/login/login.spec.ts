import { MissingParamError } from "./../../errors/missing-param-error";
import { HttpResponse } from "./../../protocolos/http";
import { LoginController } from "./login";
import { badRequest } from "../../helpers/http-helper";

interface SutTypes {
  sut: LoginController;
}

const makeSut = (): any => {
  const sut = new LoginController();
  return {
    sut,
  };
};

describe("Lgin Controller", () => {
  test("should return 400 if no email is provider", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
  });

  test("should return 400 if no password is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "any_email@mail.com",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("password")));
  });
});
