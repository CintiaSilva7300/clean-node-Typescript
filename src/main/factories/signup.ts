import { SignUpController } from "../../presentation/controllers/singUp/signup";
import { EmailValidatoAdapter } from "../../utils/email-validator-adapter";
import { DbAddAccount } from "../../data/usecases/add-account/db-add-account";
import { BcriptAdapter } from "../../infra/criptografhy/bcript-adapter";
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account";

export const makeSignupController = (): SignUpController => {
  const salt = 12;
  const emailValidatoAdapter = new EmailValidatoAdapter();
  const bcriptAdapter = new BcriptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcriptAdapter, accountMongoRepository);
  return new SignUpController(emailValidatoAdapter, dbAddAccount);
};
