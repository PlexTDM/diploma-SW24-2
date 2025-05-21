import express from "express";
import auth from "@/controllers/auth";
import { body } from "express-validator";
const app = express.Router();

const validateUser = [
  body("username").exists(),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").exists().isLength({ min: 8 }),
];

app.post("/login", auth.login);
app.post("/register", validateUser, auth.register);
app.post("/logout", auth.logout);
app.post("/refresh", auth.generateNewToken);
app.post("/google", auth.google);
app.get("/authorize", auth.authorize);
app.get("/callback", auth.callback);

export default app;
