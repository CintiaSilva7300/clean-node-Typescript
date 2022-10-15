import { EmailValidatoAdapter } from "./email-validator";

describe("EmailValidator Adapter", () => {
  test("Should return if validatos returns false", () => {
    const sut = new EmailValidatoAdapter();
    const isValid = sut.isValid("invalid_email@gmail.com");
    expect(isValid).toBe(false);
  });
});
