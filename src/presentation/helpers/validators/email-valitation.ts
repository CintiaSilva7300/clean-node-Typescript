import {
  InvalidParamError,
  MissingParamError,
} from "../../../presentation/errors";
import { Validation } from "../../protocolos/validation";
import { EmailValidator } from "../../protocolos/email-validator";

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}
  validate(input: any): Error | undefined {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);
    if (!isValid) {
      return new InvalidParamError("email");
    }
    return undefined;
  }
}
