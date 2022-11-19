import { EmailValidator } from "src/presentation/protocolos/email-validator";
import validator from "validator";

export class EmailValidatoAdapter implements EmailValidator {
  isValid(email: string): boolean {
    // console.log("email-----------", email);
    return validator.isEmail(email);
    // return false;
  }
}
