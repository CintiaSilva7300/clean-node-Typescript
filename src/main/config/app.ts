import express from "express";
import setupMiddweres from "./middlewares";
import setupRoutes from "./routes";

const app = express();
setupMiddweres(app);
setupRoutes(app);
export default app;
