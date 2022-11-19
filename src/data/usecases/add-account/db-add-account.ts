import { AddAccountRepository } from "../../protocols/db/account/add-account-repository";
import {
  AddAccount,
  addAccountModel,
  AccountModel,
  Hasher,
} from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher;
  private readonly addAccountRepository: AddAccountRepository;

  constructor(hasher: Hasher, addAccountRepository: AddAccountRepository) {
    this.hasher = hasher;
    this.addAccountRepository = addAccountRepository;
  }
  async add(accountData: addAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password);
    const account = await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword })
    );
    return account;
  }
}
