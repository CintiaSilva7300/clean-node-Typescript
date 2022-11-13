import { Validation } from "../../presentation/helpers/validators/validation";
import { RequiredFieldValidation } from "../../presentation/helpers/validators/require-field-valitation";
import { ValidationComposite } from "./../../presentation/helpers/validators/validation-composite";
import { CompareFieldsValidation } from "../../presentation/helpers/validators/compare-fields-valitation";

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(
    new CompareFieldsValidation("password", "passwordConfirmation")
  );

  return new ValidationComposite(validations);
};
