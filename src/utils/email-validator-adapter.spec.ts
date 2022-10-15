import { EmailValidatoAdapter } from "./email-validator";
import validator from "validator";

// jest.mock("validator", () => ({
//   isEmail(): boolean {
//     return true;
//   },
// }));

const makeSut = (): EmailValidatoAdapter => {
  return new EmailValidatoAdapter();
};

describe("EmailValidator Adapter", () => {
  test("Should return false if validatos returns false", () => {
    const sut = makeSut();
    jest.spyOn(validator, "isEmail").mockImplementationOnce(() => false);
    const isValid = sut.isValid("invalid_email@gmail.com");
    expect(isValid).toBe(false);
  });

  test("Should return true if validatos returns true", () => {
    const sut = makeSut();
    jest.spyOn(validator, "isEmail").mockImplementationOnce(() => true);
    const isValid = sut.isValid("valid_email@gmail.com");
    expect(isValid).toBe(true);
  });

  test("Should call validatos with correct email", () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(validator, "isEmail");
    sut.isValid("any_email@gmail.com");
    expect(isEmailSpy).toHaveBeenCalledWith("any_email@gmail.com");
  });
});
