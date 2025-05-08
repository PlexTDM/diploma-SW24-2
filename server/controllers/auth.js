import path from "path"
import express from "express"
import { body, validationResult } from "express-validator"
import { authenticate, generateAccessToken, generateRefreshToken } from "./token.js"
import jwt from 'jsonwebtoken'
import bcryptjs from "bcryptjs"
import User from "../models/user.js"
import mongoose from "mongoose"

const app = express.Router()
const __dirname = path.resolve()
const { genSaltSync, hashSync, compareSync } = bcryptjs

app.post("/login", async (req, res) => {
  const { password, email } = req.body
  try {
    const token = req.cookies.token; // Assuming the token is stored in cookies
    if (token) {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Invalid token" });
        }
        const user = await User.findById(decoded.userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);

        return res.json({
          message: "User logged in successfully with token",
          user,
          accessToken,
          refreshToken,
        });
      });
    }

    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }
    if (!bcryptjs.compareSync(password, user.password)) {
      return res.status(401).json({ message: "password does not match" })
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = await generateRefreshToken(user)

    res.json({
      message: "User Logged in successfully",
      user,
      accessToken,
      refreshToken,
    })
  } catch (e) {
    console.error("login", e)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

const validateUser = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").exists().withMessage('Password is required').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  body("age").isNumeric().withMessage("Age must be a number"),
  body("height").isNumeric().withMessage("Height must be a number"),
  body("weight").isNumeric().withMessage("Weight must be a number"),
  body("goal").exists().withMessage("Goal is required"),
  body("activityLevel").exists().withMessage("Activity Level is required"),
  body("mealPerDay").exists().withMessage("Meal Per Day is required"),
  body("waterPerDay").exists().withMessage("Water Per Day is required"),
  body("workSchedule").exists().withMessage("Work Schedule is required"),
  body("healthCondition").exists().withMessage("Health Condition is required"),
]
app.post("/register", validateUser, async (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.error("register error", errors)
    return res.status(400).json({ errors: errors.array() })
  }

  const { email } = req.body

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" })
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const existingUser = await User.findOne({ email }).session(session)

    if (existingUser) {
      console.log("trying to register existing user", existingUser.email)
      await session.abortTransaction()
      session.endSession()
      return res.status(400).json({ message: "User already exists" })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = await User.create(
      [
        {
          firstName,
          lastName,
          email,
          phone,
          password: hashedPassword,
          role: "USER",
        },
      ],
      { session }
    )

    console.log("user registered", newUser[0])
    const accessToken = generateAccessToken(newUser[0])
    const refreshToken = await generateRefreshToken(newUser[0])

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser[0].id,
        email: newUser[0].email,
        role: newUser[0].role,
      },
      accessToken,
      refreshToken,
    })

    await session.commitTransaction()
    session.endSession()
  } catch (e) {
    if (e) {
      await session.abortTransaction()
      session.endSession()
      console.error("register", e)
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
})

app.put("/update", authenticate, async (req, res) => {
  const { password, newPassword, accessToken, id } = req.body
  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }

    const valid = compareSync(password, user.password)
    if (!valid)
      return res.status(401).json({ message: "password didn't match" })

    const salt = genSaltSync(18)
    const hashedPassword = hashSync(newPassword, salt)

    await User.findByIdAndUpdate(id, {
      password: hashedPassword,
    })

    res.status(200).json({ message: "Password updated successfully" })
  } catch (e) {
    console.error("update", e)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

export default app
