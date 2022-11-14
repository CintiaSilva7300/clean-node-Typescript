import { MissingParamError } from "./../../errors/missing-param-error";
import { RequiredFieldValidation } from "./required-field-valitation";

describe("RequiredField Validation", () => {
  test("should return a MissingParamError if validation fails", () => {
    const sut = new RequiredFieldValidation("field");
    const error = sut.validate({ nama: "any_name" });
    expect(error).toEqual(new MissingParamError("field"));
  });

  test("should not return if validation successed", () => {
    const sut = new RequiredFieldValidation("field");
    const error = sut.validate({ field: "any_name" });
    expect(error).toBeFalsy();
  });
});
