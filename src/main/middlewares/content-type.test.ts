import request from "supertest";
import app from "../config/app";

describe("Contente type middleware", () => {
  test("should return defalut type as json", async () => {
    app.get("/test_content_type", (req: any, res: any) => {
      res.send("");
    });
    await request(app).get("/test_content_type").expect("content-type", /json/);
  });

  test("should return xml content type when forced", async () => {
    app.get("/test_content_type_xml", (req: any, res: any) => {
      res.type("xml");
      res.send("");
    });
    await request(app)
      .get("/test_content_type_xml")
      .expect("content-type", /xml/);
  });
});
