import { AccountModel } from "./../../domain/models/account";
import { LogErrorRepository } from "../../data/protocols/log-error-repository";
import { serverError, ok } from "../../presentation/helpers/http-helper";
import { HttpResponse, HttpRequest } from "../../presentation/protocolos/http";
import { Controller } from "src/presentation/protocolos";
import { LogControllerDecorator } from "./log";

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: "any_name",
    email: "any_mail@gmail.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  },
});

const makefakeAccount = (): AccountModel => ({
  id: "valid_id",
  name: "valid_name",
  email: "cintia@gmail.com",
  password: "valid_password",
});

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error();
  fakeError.stack = "any_stack";
  return serverError(fakeError);
};

interface SutTypes {
  sut: LogControllerDecorator;
  controllerStub: Controller;
  logErrorRepositoryStub: LogErrorRepository;
}

const makeControler = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise((resolve) => resolve(ok(makefakeAccount())));
    }
  }

  return new ControllerStub();
};

const makeSut = (): SutTypes => {
  const controllerStub = makeControler();
  const logErrorRepositoryStub = makeLogErrorRepository();
  const sut = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub
  );

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  };
};

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log(stack: string): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new LogErrorRepositoryStub();
};

describe("LogController Decorator", () => {
  test("should call controller handle", async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, "handle");
    await sut.handle(makeFakeRequest());
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest());
  });

  test("should return the same result of the controller", async () => {
    const { sut } = makeSut();

    const HttpResponse = await sut.handle(makeFakeRequest());
    expect(HttpResponse).toEqual(ok(makefakeAccount()));
  });

  test("should call logErrorRepository with correct erro if controller returns a server error", async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const logSpy = jest.spyOn(logErrorRepositoryStub, "log");
    jest
      .spyOn(controllerStub, "handle")
      .mockReturnValueOnce(
        new Promise((resolve) => resolve(makeFakeServerError()))
      );
    await sut.handle(makeFakeRequest());
    expect(logSpy).toHaveBeenCalledWith("any_stack");
  });
});
