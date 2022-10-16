import {
  AddAccount,
  addAccountModel,
  AccountModel,
  Encrypter,
} from "./db-add-account-protocols";

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
