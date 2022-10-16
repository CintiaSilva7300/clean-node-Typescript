import { Encrypter } from "./../../protocols/encrypter";
import { AccountModel } from "./../../../domain/models/account";
import { AddAccount, addAccountModel } from "src/domain/usecases/add-account";

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }
  async add(account: addAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);
    return new Promise((resolve) =>
      resolve({ id: "", name: "", email: "", password: "" })
    );
  }
}
