import { MissingParamError } from "./../../errors/missing-param-error";
import { HttpResponse } from "./../../protocolos/http";
import { LoginController } from "./login";
import { badRequest } from "../../helpers/http-helper";

describe("Lgin Controller", () => {
  test("should return 400 if no email is provider", async () => {
    const sut = new LoginController();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
  });

  test("should return 400 if no password is provided", async () => {
    const sut = new LoginController();
    const httpRequest = {
      body: {
        email: "any_email@mail.com",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("password")));
  });
});
