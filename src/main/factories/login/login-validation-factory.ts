import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from "../../../presentation/helpers/validators";
import { EmailValidatoAdapter } from "../../adapters/validators/email-validator-adapter";
import { Validation } from "../../../presentation/protocolos/validation";

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["email", "password"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation("email", new EmailValidatoAdapter()));
  return new ValidationComposite(validations);
};
