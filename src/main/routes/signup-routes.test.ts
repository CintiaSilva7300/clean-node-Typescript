import { MongoHelper } from "./../../infra/db/mongodb/helpers/mongo-helper";
import request from "supertest";
import app from "../config/app";

describe("Signup Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env["MONGO_URL"] as string);
  });
  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  test("Should return an account on sucess ", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "",
        email: "",
        password: "123",
        passwordConfimation: "123",
      })
      .expect(200);
  });
});
