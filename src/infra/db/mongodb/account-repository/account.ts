import { addAccountModel } from "./../../../../domain/usecases/add-account";
import { AccountModel } from "./../../../../domain/models/account";
import { AddAccountRepository } from "src/data/protocols/add-account-repository";
import { MongoHelper } from "../helpers/mongo-helper";

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: addAccountModel): Promise<any> {
    const accountCollection = MongoHelper.getCollection("accounts");
    const result = await accountCollection.insertOne(accountData);
    // const account = result.ops[0];

    return result.insertedId !== null;
  }
}
