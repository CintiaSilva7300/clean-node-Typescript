import {
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldsValidation,
  EmailValidation,
} from "../../../presentation/helpers/validators";
import { EmailValidatoAdapter } from "../../adapters/validators/email-validator-adapter";
import { Validation } from "../../../presentation/protocolos/validation";

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(
    new CompareFieldsValidation("password", "passwordConfirmation")
  );
  validations.push(new EmailValidation("email", new EmailValidatoAdapter()));
  return new ValidationComposite(validations);
};
