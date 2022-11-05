import { connect } from "http2";
import { MongoHelper as sut } from "./mongo-helper";

describe("MongoHelper", () => {
  beforeAll(async () => {
    await sut.connect(process.env["MONGO_URL"] as string);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test("Should reconnect if mongoDb is down", async () => {
    // await sut.connect(process.env["MONGO_URL"] as string);
    let accountCollection = await sut.getCollection("accounts");
    expect(accountCollection).toBeTruthy();

    await sut.disconnect();
    accountCollection = await sut.getCollection("accounts");
    expect(accountCollection).toBeTruthy();
  });
});
