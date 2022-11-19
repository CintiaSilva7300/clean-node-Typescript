import { AccountModel } from "./../../../../domain/models/account";
import { LoadAccountByEmailRepository } from "./../../../../data/protocols/db/load-account-by-email-repository";
import { addAccountModel } from "./../../../../domain/usecases/add-account";
import { AddAccountRepository } from "src/data/protocols/db/add-account-repository";
import { MongoHelper } from "../helpers/mongo-helper";

export class AccountMongoRepository
  implements AddAccountRepository, LoadAccountByEmailRepository
{
  async add(accountData: addAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection("accounts");
    const result = await accountCollection.insertOne(accountData);

    const account = await accountCollection.findOne({
      _id: result.insertedId,
    });
    return MongoHelper.map(account);
  }

  async loadByEmail(email: string): Promise<AccountModel | any> {
    const accountCollection = await MongoHelper.getCollection("accounts");
    const account = await accountCollection.findOne({ email });
    return account && MongoHelper.map(account);
  }
}
