import { LogErrorRepository as LogErrorRepository } from "src/data/protocols/log-error-repository";
import { serverError } from "../../presentation/helpers/http-helper";
import { HttpResponse, HtppRequest } from "../../presentation/protocolos/http";
import { Controller } from "src/presentation/protocolos";
import { LogControllerDecorator } from "./log";

interface SutTypes {
  sut: LogControllerDecorator;
  controllerStub: Controller;
  logErrorRepositoryStub: LogErrorRepository;
}

const makeControler = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HtppRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: "cintia",
        },
      };
      return new Promise((resolve) => resolve(httpResponse));
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
    const httpRequest = {
      body: {
        email: "any_mail@mail.com",
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  test("should return the same result of the controller", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "any_mail@mail.com",
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const HttpResponse = await sut.handle(httpRequest);
    expect(httpRequest).toEqual({
      statusCode: 200,
      body: {
        name: "Cintia",
      },
    });
  });

  test("should call logErrorRepository with correct erro if controller returns a server error", async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const fakeError = new Error();
    fakeError.stack = "any_stack";
    const error = serverError(fakeError);
    const logSpy = jest.spyOn(logErrorRepositoryStub, "log");
    jest
      .spyOn(controllerStub, "handle")
      .mockReturnValueOnce(new Promise((resolve) => resolve(error)));
    const httpRequest = {
      body: {
        email: "any_mail@mail.com",
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    await sut.handle(httpRequest);
    expect(logSpy).toHaveBeenCalledWith("any_stack");
  });
});