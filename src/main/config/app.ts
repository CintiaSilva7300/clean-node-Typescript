import express from "express";
import setupMiddweres from "./middlewares";

const app = express();
setupMiddweres(app);
export default app;
