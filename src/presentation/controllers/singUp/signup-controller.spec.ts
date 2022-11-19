import { HttpRequest } from "../../protocolos/http";
import { SignUpController } from "./signup-controller";
import {
  ServerError,
  InvalidParamError,
  MissingParamError,
} from "../../errors";
import {
  EmailValidator,
  AccountModel,
  AddAccount,
  addAccountModel,
  Validation,
} from "./singup-controller-protocols";
import { ok, serverError, badRequest } from "../../helpers/http/http-helper";

const makeAddAccount = (): AddAccount => {
  class addAccountStub implements AddAccount {
    async add(account: addAccountModel): Promise<AccountModel> {
      return new Promise((resolve) => resolve(makefakeAccount()));
    }
  }
  return new addAccountStub();
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | undefined {
      return undefined;
    }
  }
  return new ValidationStub();
};

const makefakeAccount = (): AccountModel => ({
  id: "valid_id",
  name: "valid_name",
  email: "cintia@gmail.com",
  password: "valid_password",
});

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: "any_name",
    email: "any_mail@gmail.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  },
});

interface SutTypes {
  sut: SignUpController;
  addAccountStub: AddAccount;
  validationStub: Validation;
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount();
  const validationStub = makeValidation();
  const sut = new SignUpController(addAccountStub, validationStub);
  return { sut, addAccountStub, validationStub };
};

describe("Signup Controller", () => {
  test("Should call addAccount with correct values", async () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, "add");
    const httpRequest = {
      body: {
        name: "cintia",
        email: "cintia@gmail.com",
        password: "123",
        passwordConfirmation: "123",
      },
    };
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: "cintia",
      email: "cintia@gmail.com",
      password: "123",
    });
  });

  test("Should return 500 if AddAccount thorows", async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, "add").mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()));
    });
    const httpRequest = {
      body: {
        name: "cintia",
        email: "cintia@gmail.com",
        password: "123",
        passwordConfirmation: "123",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError(new ServerError(undefined)));
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError(undefined));
  });

  test("Should return 200 if invalid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makefakeAccount()));
  });

  test("Should call Validation with correct values", async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, "validate");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenLastCalledWith(httpRequest.body);
  });

  test("Should return 400 if validation return an erros", async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("any_field"));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError("any_field"))
    );
  });
});
