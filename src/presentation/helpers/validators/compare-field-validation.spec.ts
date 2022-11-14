import { InvalidParamError } from "./../../errors/invalid-param-error";
import { CompareFieldsValidation } from "./compare-fields-valitation";

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation("field", "fieldToCompare");
};

describe("CompareFields Validation", () => {
  test("should return a InvalidParamError if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({
      feild: "any_value",
      fieldToCompare: "wrong_value",
    });
    expect(error).toEqual(new InvalidParamError("fieldToCompare"));
  });

  test("should not return if validation successed", () => {
    const sut = makeSut();
    const error = sut.validate({
      field: "any_value",
      fieldToCompare: "any_value",
    });
    expect(error).toBeFalsy();
  });
});
