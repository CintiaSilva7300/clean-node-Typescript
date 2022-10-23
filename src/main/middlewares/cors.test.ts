import request from "supertest";
import app from "../config/app";

describe("Cors middleware", () => {
  test("should enable CORS ", async () => {
    app.get("/test_cors", (req: any, res: any) => {
      res.send(req.body);
    });
    await request(app)
      .get("/test_cors")
      .expect("access-control-allow-origin", "*")
      .expect("access-control-allow-headers", "*")
      .expect("access-control-allow-methods", "*");
  });
});
