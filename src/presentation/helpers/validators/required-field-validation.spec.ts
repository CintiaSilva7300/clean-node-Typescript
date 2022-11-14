import { MissingParamError } from "./../../errors/missing-param-error";
import { RequiredFieldValidation } from "./required-field-valitation";

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation("field");
};

describe("RequiredField Validation", () => {
  test("should return a MissingParamError if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({ nama: "any_name" });
    expect(error).toEqual(new MissingParamError("field"));
  });

  test("should not return if validation successed", () => {
    const sut = makeSut();
    const error = sut.validate({ field: "any_name" });
    expect(error).toBeFalsy();
  });
});
