import { EmailValidatoAdapter } from "./email-validator";
import validator from "validator";

// jest.mock("validator", () => ({
//   isEmail(): boolean {
//     return true;
//   },
// }));

describe("EmailValidator Adapter", () => {
  test("Should return false if validatos returns false", () => {
    const sut = new EmailValidatoAdapter();
    jest.spyOn(validator, "isEmail").mockImplementationOnce(() => false);
    const isValid = sut.isValid("invalid_email@gmail.com");
    expect(isValid).toBe(false);
  });

  test("Should return true if validatos returns true", () => {
    const sut = new EmailValidatoAdapter();
    jest.spyOn(validator, "isEmail").mockImplementationOnce(() => true);
    const isValid = sut.isValid("valid_email@gmail.com");
    expect(isValid).toBe(true);
  });
});
