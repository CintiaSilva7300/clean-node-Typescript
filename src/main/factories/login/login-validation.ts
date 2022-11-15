import { EmailValidatoAdapter } from "./../../../utils/email-validator-adapter";
import { EmailValidation } from "./../../../presentation/helpers/validators/email-valitation";
import { Validation } from "../../../presentation/helpers/validators/validation";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-valitation";
import { ValidationComposite } from "./../../../presentation/helpers/validators/validation-composite";

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["email", "password"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation("email", new EmailValidatoAdapter()));
  return new ValidationComposite(validations);
};
