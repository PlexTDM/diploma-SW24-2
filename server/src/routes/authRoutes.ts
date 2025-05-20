import express from "express";
import auth from "@/controllers/auth";
import { body } from "express-validator";
const app = express.Router();

const validateUser = [
  body("username").exists(),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").exists().isLength({ min: 8 }),
  body("gender").exists(),
  body("birthday").exists(),
  body("height").isNumeric(),
  body("weight").isNumeric(),
  body("goal").exists(),
  body("activityLevel").exists(),
  body("mealPerDay").exists(),
  body("waterPerDay").exists(),
  body("workSchedule").exists(),
  body("healthCondition").exists(),
];

app.post("/login", auth.login);
app.post("/register", validateUser, auth.register);
app.post("/logout", auth.logout);
app.post("/refresh", auth.generateNewToken);
app.post("/google", auth.google);

export default app;
