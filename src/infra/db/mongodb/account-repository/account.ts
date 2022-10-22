import { addAccountModel } from "./../../../../domain/usecases/add-account";
import { AddAccountRepository } from "src/data/protocols/add-account-repository";
import { MongoHelper } from "../helpers/mongo-helper";

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: addAccountModel): Promise<any> {
    const accountCollection = MongoHelper.getCollection("accounts");
    const result = await accountCollection.insertOne(accountData);

    const account = await accountCollection.findOne({ _id: result.insertedId });
    return MongoHelper.map(account);
  }
}
