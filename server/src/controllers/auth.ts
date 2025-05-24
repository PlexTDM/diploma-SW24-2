import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import User, { IUser } from "@/models/user";
import { generateAccessToken, generateRefreshToken } from "./token";
import { transporter } from "@/services/nodemailer";
import RefreshToken from "@/models/refreshToken";
import axios from "axios";
import * as jose from "jose";
import { BASE_URL } from "@/routes/constants";
import { APP_SCHEME } from "@/routes/constants";

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
      let refreshToken = null;
      const authHeader = req.headers.authorization;
      if (authHeader) {
        refreshToken = authHeader.split(" ")[1];
      }
      if (req.body.refreshToken) {
        refreshToken = req.body.refreshToken;
      }

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

  public static async google(req: Request, res: Response): Promise<any> {
    const { code } = req.body;
    try {
      const response = await axios.post(
        "https://oauth2.googleapis.com/token",
        new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID as string,
          client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
          redirect_uri: `${BASE_URL}/auth/callback`,
          grant_type: "authorization_code",
          code: code,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      const data = response.data;
      const userInfo = jose.decodeJwt(data.id_token) as googleUser;
      console.log("userInfo", userInfo);

      const user = await User.findOne({ email: userInfo.email })
        .select("-password")
        .exec();
      if (!user) {
        return res.status(202).json({
          message: "User not found. Ask to register.",
          data: {
            email: userInfo.email,
            username: userInfo.name,
            image: userInfo.picture,
          },
        });
      }
      const accessToken = generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);

      res.status(200).json({
        user,
        accessToken,
        refreshToken,
      });
    } catch (e) {
      console.error("Error verifying email:", e);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public static async authorize(req: Request, res: Response): Promise<any> {
    try {
      if (!process.env.GOOGLE_CLIENT_ID) {
        return res
          .status(500)
          .json({ error: "Missing GOOGLE_CLIENT_ID environment variable" });
      }

      const url = new URL(
        req.protocol + "://" + req.get("host") + req.originalUrl
      );
      let idpClientId: string;

      const internalClient = url.searchParams.get("client_id");
      const redirectUri = url.searchParams.get("redirect_uri");
      let platform;

      if (redirectUri === APP_SCHEME) {
        platform = "mobile";
      } else if (redirectUri === BASE_URL) {
        platform = "web";
      } else {
        return res.status(400).json({ error: "Invalid redirect_uri" });
      }

      let state = platform + "|" + url.searchParams.get("state");

      if (internalClient === "google") {
        idpClientId = process.env.GOOGLE_CLIENT_ID;
      } else {
        return res.status(400).json({ error: "Invalid client" });
      }

      if (!state) {
        return res.status(400).json({ error: "Invalid state" });
      }

      const params = new URLSearchParams({
        client_id: idpClientId,
        // TODO: GOOGLE_AUTH_URL needs to be defined, possibly from process.env
        // For now, I'll use a placeholder. Replace with actual value.
        redirect_uri: `${BASE_URL}/auth/callback`,
        response_type: "code",
        scope: url.searchParams.get("scope") || "identity",
        state: state,
        prompt: "select_account",
      });

      console.log("redirect_uri", BASE_URL);
      const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
      return res.redirect(GOOGLE_AUTH_URL + "?" + params.toString());
    } catch (e) {
      console.error("authorize error:", e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public static async callback(req: Request, res: Response): Promise<any> {
    const incomingParams = new URLSearchParams(req.url.split("?")[1]);
    const combinedPlatformAndState = incomingParams.get("state");
    if (!combinedPlatformAndState) {
      return res.status(400).json({ error: "Invalid state" });
    }
    const state = combinedPlatformAndState.split("|")[1];

    const outgoingParams = new URLSearchParams({
      code: incomingParams.get("code")?.toString() || "",
      state,
    });

    return res.redirect(
      APP_SCHEME + "/(auth)/signup" + "?" + outgoingParams.toString()
    );
  }
}

export default AuthController;

type googleUser = {
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
  name: string;
};
