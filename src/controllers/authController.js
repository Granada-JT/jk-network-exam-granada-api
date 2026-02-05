import jwt from "jsonwebtoken";
import cookie from "cookie";
import argon2 from "argon2";
import prisma from "../lib/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN) || 3600;

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing credentials" });

    const user = await prisma.employee_records.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid Email" });

    const valid = await argon2.verify(user.password, password);
    if (!valid) return res.status(401).json({ error: "Invalid Password" });

    // Create JWT payload
    const payload = { sub: user.id, email: user.email, role: user.accountType };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const isProd = process.env.NODE_ENV === "production";
    const cookieStr = cookie.serialize("app_session", token, {
      httpOnly: true,
      secure: isProd, // true on production (https), update on .env for local development
      sameSite: "lax",
      path: "/",
      maxAge: JWT_EXPIRES_IN,
    });

    res.setHeader("Set-Cookie", cookieStr);

    return res.status(200).json({ valid: valid });
  } catch (err) {
    console.error("handleLogin error:", err);
    return res.status(500).json({ error: err?.message ?? "Server error" });
  }
};
