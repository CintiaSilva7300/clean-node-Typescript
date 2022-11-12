import { HttpRequest } from "./../../protocolos/http";
import { SignUpController } from "./signup";
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
} from "./singup-protocols";
import { ok, serverError, badRequest } from "../../helpers/http-helper";

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

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
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount;
  validationStub: Validation;
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const validationStub = makeValidation();
  const sut = new SignUpController(
    emailValidatorStub,
    addAccountStub,
    validationStub
  );
  return { sut, emailValidatorStub, addAccountStub, validationStub };
};

describe("Signup Controller", () => {
  test("Should return 400 if no name is provided", async () => {
    const { sut } = makeSut();
    const httpRequesr = {
      body: {
        // name: 'cintia',
        email: "cintia@gmail.com",
        password: "123",
        passwordConfirmation: "123",
      },
    };
    const httpResponse = await sut.handle(httpRequesr);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("name")));
  });

  test("Should return 400 if no email is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "cintia",
        // email: 'cintia@gmail.com',
        password: "123",
        passwordConfirmation: "123",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
  });

  test("Should return 400 if no passwor is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "cintia",
        email: "cintia@gmail.com",
        // password:'123',
        passwordConfirmation: "123",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("password")));
  });

  test("Should return 400 if no passwordConfirmation is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "cintia",
        email: "cintia@gmail.com",
        password: "123",
        // passwordConfirmation: '123',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(
      badRequest(new MissingParamError("passwordConfirmation"))
    );
  });

  test("Should return 400 if password confirmation fails", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "cintia",
        email: "cintia@gmail.com",
        password: "123",
        passwordConfirmation: "invalid_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      badRequest(new InvalidParamError("passwordConfirmation"))
    );
  });

  test("Should return 400 if an invalid email is provided", async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(badRequest(new InvalidParamError("email")));
  });

  test("Should call EmailValidator with correct email", async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = await jest.spyOn(emailValidatorStub, "isValid");
    sut.handle(makeFakeRequest());
    expect(isValidSpy).toHaveBeenCalledWith("any_mail@gmail.com");
  });

  test("Should return 500 if EmailValidator thorows", async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(undefined)));
  });

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
});
