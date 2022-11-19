import { SignUpController } from "../../../presentation/controllers/singUp/signup-controller";
import { DbAddAccount } from "../../../data/usecases/add-account/db-add-account";
import { BcriptAdapter } from "../../../infra/criptography/bcrypter-adapter/bcript-adapter";
import { AccountMongoRepository } from "../../../infra/db/mongodb/account/account-mongo-repository";
import { LogMongoRepository } from "../../../infra/db/mongodb/log/log-mongo-repository";
import { Controller } from "src/presentation/protocolos";
import { LogControllerDecorator } from "../../decorators/log-controller-decorator";
import { makeSignupValidation } from "./signup-validation-factory";

export const makeSignupController = (): Controller => {
  const salt = 12;
  const bcriptAdapter = new BcriptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcriptAdapter, accountMongoRepository);
  const signUpController = new SignUpController(
    dbAddAccount,
    makeSignupValidation()
  );
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(signUpController, logMongoRepository);
};
