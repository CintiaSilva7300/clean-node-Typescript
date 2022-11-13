import { CompareFieldsValidation } from "./../../presentation/helpers/validators/compare-fields-valitation";
import { Validation } from "../../presentation/helpers/validators/validation";
import { RequiredFieldValidation } from "../../presentation/helpers/validators/require-field-valitation";
import { ValidationComposite } from "./../../presentation/helpers/validators/validation-composite";
import { makeSignupValidation } from "./signup-validation";

jest.mock("./../../presentation/helpers/validators/validation-composite");

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
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
