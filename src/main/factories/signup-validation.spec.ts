import { Validation } from "../../presentation/helpers/validators/validation";
import { RequiredFieldValidation } from "../../presentation/helpers/validators/require-field-valitation";
import { ValidationComposite } from "./../../presentation/helpers/validators/validation-composite";
import { makeSignupValidation } from "./signup-validation";

jest.mock("./../../presentation/helpers/validators/validation-composite");

describe("SignUpValidation Factory", () => {
  test("should call ValidationComposite with all validations  ", () => {
    makeSignupValidation();
    const validations: Validation[] = [];
    for (const field of [
      "name",
      "email",
      "password",
      "passwordConfirmations",
    ]) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
