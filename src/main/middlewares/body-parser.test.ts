import request from "supertest";
import app from "../config/app";

describe("Body Parser Midddleware", () => {
  test("should parse body as json ", async () => {
    app.post("/test_body_parser", (req: any, res: any) => {
      res.send(req.body);
    });
    await request(app)
      .post("/test_body_parser")
      .send({ name: "Cintia" })
      .expect({ name: "Cintia" });
  });
});
