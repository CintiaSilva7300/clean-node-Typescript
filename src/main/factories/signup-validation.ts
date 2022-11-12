import { Validation } from "../../presentation/helpers/validators/validation";
import { RequiredFieldValidation } from "../../presentation/helpers/validators/require-field-valitation";
import { ValidationComposite } from "./../../presentation/helpers/validators/validation-composite";

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["name", "email", "password", "passwordConfirmations"]) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new ValidationComposite(validations);
};
