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
} from "./singup-protocols";

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
      const fakeAccount = {
        id: "valid_id",
        name: "valid_name",
        email: "cintia@gmail.com",
        password: "valid_password",
      };
      return new Promise((resolve) => resolve(fakeAccount));
    }
  }
  return new addAccountStub();
};

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount;
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const sut = new SignUpController(emailValidatorStub, addAccountStub);
  return { sut, emailValidatorStub, addAccountStub };
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
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
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
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
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
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
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
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation")
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
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError("passwordConfirmation")
    );
  });

  test("Should return 400 if an invalid email is provided", async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        name: "cintia",
        email: "invalid_email@gmail.com",
        password: "123",
        passwordConfirmation: "123",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  test("Should call EmailValidator with correct email", async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = await jest.spyOn(emailValidatorStub, "isValid");
    const httpRequest = {
      body: {
        name: "cintia",
        email: "cintia@gmail.com",
        password: "123",
        passwordConfirmation: "123",
      },
    };
    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith("cintia@gmail.com");
  });

  test("Should return 500 if EmailValidator thorows", async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
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
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError("error"));
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
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError("error"));
  });

  test("Should return 200 if invalid data is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "valid_name",
        email: "cintia@gmail.com",
        password: "valid_password",
        passwordConfirmation: "valid_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "valid_id",
      name: "valid_name",
      email: "cintia@gmail.com",
      password: "valid_password",
    });
  });
});
