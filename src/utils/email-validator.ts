import { EmailValidator } from "src/presentation/protocolos/email-validator";

export class EmailValidatoAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return false;
  }
}
