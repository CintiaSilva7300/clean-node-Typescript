import { EmailValidation } from "../../../presentation/helpers/validators/email-valitation";
import { CompareFieldsValidation } from "../../../presentation/helpers/validators/compare-fields-valitation";
import { Validation } from "../../../presentation/helpers/validators/validation";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-valitation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";
import { makeSignupValidation } from "./signup-validation";
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
