import { DbAddAccount } from "./db-add-account";

describe("DbAddAccount Usecase", () => {
  test("Should call Encrypter with correct password", async () => {
    class EncrypeterStub {
      async encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve("hashed_password"));
      }
    }
    const encrypeterStub = new EncrypeterStub();
    const sut = new DbAddAccount(encrypeterStub);
    const encryptSpy = jest.spyOn(encrypeterStub, "encrypt");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });
});
