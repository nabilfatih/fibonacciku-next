import connectDB from "../../config/connectDB";
import User from "../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import absoluteUrl from "next-absolute-url";
import { setTokenCookie } from "../../lib/cookies";

connectDB();

export default async function Login(req, res) {
  const { username, password } = req.body;
  const referer = req.headers.referer;

  const { origin } = absoluteUrl(req);
  const ref = referer.replace(origin, "");

  try {
    if (req.method === "POST") {
      if (!username || !password) {
        return res.status(422).json({ error: "Masukkan data kamu 🤬" });
      }
      const user = await User.findOne({ username: username.toLowerCase() });
      if (!user) {
        return res.status(404).json({ error: "Akun tidak ditemukan 😤" });
      }
      if (!user.emailVerified) {
        return res.status(401).json({ error: "Akun belum diverifikasi 😤" });
      }
      const doMatch = await bcrypt.compare(password, user.password);
      if (doMatch) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "3d",
        });

        const { username, _id, nama, avatar } = user;

        setTokenCookie(token, res);

        res.status(201).json({
          user: { username, _id, nama, avatar },
          referer: ref,
          message: "Welcome to FibonacciKu 🤩",
        });
      } else {
        return res.status(401).json({ error: "Password salah 🤐" });
      }
    } else {
      return res.status(401).json({ error: "Invalid credentials 🤯" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Gagal masuk 😭" });
  }
}
