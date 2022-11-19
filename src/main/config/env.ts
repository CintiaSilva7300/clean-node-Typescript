export default {
  mongoUrl:
    process.env["MONGO_URL"] ||
    "mongodb://root:123456@localhost:27017/clean-node-api?authSource=admin",
  port: process.env["PORT"] || 5050,
  jwtSecret: (process.env["JWT_SECRET"] as string) || "tj670==5H",
};
