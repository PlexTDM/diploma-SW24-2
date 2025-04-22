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

app.options("/auth/loginToken", (req, res) => {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
})

app.get('/loginToken', authenticate, async (req, res) => {

    try {
        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).json({ message: "User not found" })

        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = await generateRefreshToken(user)

        res.json({
            message: "User Logged in successfully",
            user,
            accessToken: newAccessToken,
            refreshToken:newRefreshToken,
        })
    }catch (e) {
        console.error("login", e)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

const validateUser = [
  body("firstName").isLength({ min: 4}).withMessage("Name must be at least 4 characters").isLength({max:30}).withMessage('Name must be less than 30 characters'),
  body("lastName").optional({values: "falsy"}).isLength({ min: 4 }).withMessage('Name must be at least 4 characters').isLength({ max: 30 }).withMessage("Name must be less than 30 characters long"),
  body("email").isEmail().withMessage("Invalid email"),
  body("phone").optional({values:"falsy"}),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  body("password").exists().withMessage('Password is required').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
]

app.post("/register", validateUser, async (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.error("register error", errors)
    return res.status(400).json({ errors: errors.array() })
  }

  const { firstName, lastName, email, phone, password, confirmPassword } = req.body

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

app.put("/address", authenticate, async (req, res) => {
  try {
    const address  = req.body
    const id = req.user.id
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }

    const newData = await User.findByIdAndUpdate(id, {address})

    res.status(200).json({ message: "Address updated successfully", data:req.body })
  } catch (e) {
    console.error("update", e)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

// app.put("/profile", async (req, res) => {
//   try {

//     const authHeader = req.headers.authorization

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" })
//     }

//     const accessToken = authHeader.split(" ")[1]
//     if (!accessToken) return res.status(401).json({ message: "Unauthorized" })

//     const data = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN)

//     const user = await User.findById(data.id)

//     if (!user) {
//       return res.status(404).json({ message: "user not found" })
//     }


//     res.status(200).json({ user }).lean()
//   } catch (e) {
//     if (e.name === "TokenExpiredError") {
//       return res
//         .status(401)
//         .json({ message: "Access token expired, please login again" })
//     }
//     console.error("profile", e)
//     res.status(500).json({ message: "Internal Server Error" })
//   }
// })

export default app
