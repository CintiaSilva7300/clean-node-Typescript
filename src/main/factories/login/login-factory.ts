import { LogControllerDecorator } from "./../../decorators/log-controller-decorator";
import env from "./../../config/env";
import { JwtAdapter } from "./../../../infra/criptography/jwt-adapter/jwt-adapter";
import { Controller } from "./../../../presentation/protocolos/controller";
import { LogMongoRepository } from "./../../../infra/db/mongodb/log/log-mongo-repository";
import { LoginController } from "./../../../presentation/controllers/login/login-controller";
import { AccountMongoRepository } from "./../../../infra/db/mongodb/account/account-mongo-repository";
import { BcriptAdapter } from "./../../../infra/criptography/bcrypter-adapter/bcript-adapter";
import { makeLoginValidation } from "./login-validation-factory";
import { DdAuthentication } from "./../../../data/usecases/authentication/db-authentication";

export const makeLoginController = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcriptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  const dAuthentication = new DdAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  );
  const loginController = new LoginController(
    dAuthentication,
    makeLoginValidation()
  );
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(loginController, logMongoRepository);
};
