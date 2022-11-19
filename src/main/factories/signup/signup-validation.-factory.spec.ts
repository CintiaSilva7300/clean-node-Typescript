import {
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldsValidation,
} from "../../../presentation/helpers/validators";
import { EmailValidation } from "../../../presentation/helpers/validators/email-valitation";
import { Validation } from "../../../presentation/protocolos/validation";
import { makeSignupValidation } from "./signup-validation-factory";
import { EmailValidator } from "../../../presentation/protocolos/email-validator";

jest.mock("./../../../presentation/helpers/validators/validation-composite");

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe("SignUpValidation Factory", () => {
  test("should call ValidationComposite with all validations  ", () => {
    makeSignupValidation();
    const validations: Validation[] = [];
    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(
      new CompareFieldsValidation("password", "passwordConfirmation")
    );
    validations.push(new EmailValidation("email", makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
