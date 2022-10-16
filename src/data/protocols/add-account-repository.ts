import { addAccountModel } from "../../domain/usecases/add-account";
import { AccountModel } from "../usecases/add-account/db-add-account-protocols";

export interface AddAccountRepository {
  add(accountData: addAccountModel): Promise<AccountModel>;
}
