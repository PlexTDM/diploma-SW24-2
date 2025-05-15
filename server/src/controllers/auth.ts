import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import User, { IUser } from "@/models/user";
import { generateAccessToken, generateRefreshToken } from "./token";
import { transporter } from "@/services/nodemailer";
import { UserPayload } from "@/types";
import RefreshToken from "@/models/refreshToken";

const { genSaltSync, hashSync, compareSync } = bcryptjs;
const hashRounds = 10;

class AuthController {
  public static async login(req: Request, res: Response): Promise<any> {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

      if (token) {
        const decoded = jwt.verify(
          token,
          process.env.SECRET_ACCESS_TOKEN as string
        ) as UserPayload;

        if (!decoded) {
          return res.status(403).json({ message: "Invalid token" });
        }

        const user = await User.findById(decoded.id);

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
      }

      const { password, email } = req?.body;
      if (!password || !email)
        return res.status(400).json({ message: "Missing password or email" });

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      const match = compareSync(password, user.password);
      if (!match)
        return res.status(401).json({ message: "Password does not match" });

      const accessToken = generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);

      res.json({
        message: "User logged in successfully",
        user: {
          id: user._id,
          image: user.image,
          email: user.email,
          role: user.role,
          username: user.username,
          gender: user.gender,
          birthday: user.birthday,
          height: user.height,
          weight: user.weight,
          goal: user.goal,
          activityLevel: user.activityLevel,
          mealPerDay: user.mealPerDay,
          waterPerDay: user.waterPerDay,
          workSchedule: user.workSchedule,
          healthCondition: user.healthCondition,
          isEmailVerified: user.isEmailVerified,
          posts: user.posts,
        },
        accessToken,
        refreshToken,
      });
    } catch (e) {
      console.error("login error:", e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public static async register(req: Request, res: Response): Promise<any> {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const existingUser = await User.findOne({ email })
        .session(session)
        .exec();
      if (existingUser) {
        await session.abortTransaction();
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = genSaltSync(hashRounds);
      const hashedPassword = hashSync(password, salt);

      const newUser = (await User.create(
        [{ ...req.body, password: hashedPassword }],
        { session }
      )) as IUser[];

      const accessToken = generateAccessToken(newUser[0]);
      const refreshToken = await generateRefreshToken(newUser[0]);

      await session.commitTransaction();

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser[0]._id,
          image: newUser[0].image,
          email: newUser[0].email,
          role: newUser[0].role,
          username: newUser[0].username,
          gender: newUser[0].gender,
          birthday: newUser[0].birthday,
          height: newUser[0].height,
          weight: newUser[0].weight,
          goal: newUser[0].goal,
          activityLevel: newUser[0].activityLevel,
          mealPerDay: newUser[0].mealPerDay,
          waterPerDay: newUser[0].waterPerDay,
          workSchedule: newUser[0].workSchedule,
          healthCondition: newUser[0].healthCondition,
          isEmailVerified: newUser[0].isEmailVerified,
          posts: newUser[0].posts,
        },
        accessToken,
        refreshToken,
      });
    } catch (e) {
      await session.abortTransaction();
      console.error("register error:", e);
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      session.endSession();
    }
  }

  // update doesn't work for now
  public static async update(req: Request, res: Response): Promise<any> {
    const { password, newPassword, id } = req.body;

    try {
      const user = await User.findById(id).exec();
      if (!user) return res.status(404).json({ message: "User not found" });

      const match = compareSync(password, user.password);
      if (!match)
        return res.status(401).json({ message: "Passwords don't match" });

      const salt = genSaltSync(hashRounds);
      const hashedPassword = hashSync(newPassword, salt);

      await User.findByIdAndUpdate(id, { password: hashedPassword });

      res.status(200).json({ message: "Password updated successfully" });
    } catch (e) {
      console.error("update error:", e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public static async logout(req: Request, res: Response): Promise<any> {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

      if (!token) {
        return res.status(400).json({ message: "No token provided" });
      }

      return jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET as string,
        async (err: Error | null, decoded: any) => {
          if (err) {
            return res.status(403).json({ message: "Invalid token" });
          }

          await User.findByIdAndUpdate(decoded.id, { token: null }).exec();
          await RefreshToken.deleteMany({ userId: decoded.id }).exec();
          res.status(200).json({ message: "User logged out successfully" });
        }
      );
    } catch (e) {
      console.error("logout error:", e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public static async generateNewToken(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const authHeader = req.headers.authorization;
      const refreshToken = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

      if (!refreshToken)
        return res.status(400).json({ message: "Refresh token is required" });

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        async (err: Error | null, decoded: any) => {
          if (err) {
            return res.status(403).json({ message: "Invalid refresh token" });
          }

          const user = await User.findById(decoded.userId)
            .select("-password")
            .exec();
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }

          const accessToken = generateAccessToken(user);
          const newRefreshToken = await generateRefreshToken(user);

          res.json({
            message: "Tokens generated successfully",
            accessToken,
            refreshToken: newRefreshToken,
          });
        }
      );
    } catch (e) {
      console.error("generateNewToken error:", e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public static async sendVerificationEmail(
    req: Request,
    res: Response
  ): Promise<any> {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.EMAIL_VERIFICATION_SECRET as string,
        { expiresIn: "1h" }
      );

      const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

      user.emailVerificationToken = token;
      user.emailVerificationTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry
      await user.save();

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: user.email,
        subject: "Email Verification",
        html: `<p>Please click on the link below to verify your email:</p>
               <a href="${verificationUrl}">Verify Email</a>`,
      };

      transporter.sendMail(mailOptions, (error, _info) => {
        if (error) {
          return res.status(500).json({ message: "Error sending email" });
        }
        res.status(200).json({ message: "Verification email sent" });
      });
    } catch (e) {
      console.error("Error sending verification email:", e);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public static async verifyEmail(req: Request, res: Response): Promise<any> {
    const { token } = req.query;

    try {
      const decoded = jwt.verify(
        token as string,
        process.env.EMAIL_VERIFICATION_SECRET as string
      ) as UserPayload;

      const user = await User.findById(decoded.id).select("-password").exec();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.isEmailVerified) {
        return res.status(400).json({ message: "Email already verified" });
      }

      // Check token expiry
      if (
        user.emailVerificationTokenExpiry &&
        user.emailVerificationTokenExpiry < new Date()
      ) {
        return res.status(400).json({ message: "Token expired" });
      }

      // Set user as verified
      user.isEmailVerified = true;
      user.emailVerificationToken = "";
      user.emailVerificationTokenExpiry = new Date();
      await user.save();

      res.status(200).json({ message: "Email verified successfully" });
    } catch (e) {
      console.error("Error verifying email:", e);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AuthController;
