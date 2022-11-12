import { Authentication } from "./../../../domain/usecases/authentication";
import { InvalidParamError } from "./../../errors/invalid-param-error";
import { EmailValidator } from "./../../protocolos/email-validator";
import { MissingParamError } from "../../errors";
import {
  badRequest,
  serverError,
  unauthorized,
} from "./../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocolos";

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly authentication: Authentication;

  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ["email", "password"];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { email, password } = httpRequest.body;
      const isValid = this.emailValidator.isValid(email);

      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }

      const accessToken = await this.authentication.auth(email, password);
      if (!accessToken) {
        return unauthorized();
      }

      await this.authentication.auth(email, password);

      return badRequest(new MissingParamError("email"));
    } catch (error: any) {
      return serverError(error);
    }
  }
}
