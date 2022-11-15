import { SignUpController } from "../../../presentation/controllers/singUp/signup";
import { DbAddAccount } from "../../../data/usecases/add-account/db-add-account";
import { BcriptAdapter } from "../../../infra/criptografhy/bcript-adapter";
import { AccountMongoRepository } from "../../../infra/db/mongodb/account-repository/account";
import { LogMongoRepository } from "../../../infra/db/mongodb/log-repository/log";
import { Controller } from "src/presentation/protocolos";
import { LogControllerDecorator } from "../../decorators/log";
import { makeSignupValidation } from "./signup-validation";

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
