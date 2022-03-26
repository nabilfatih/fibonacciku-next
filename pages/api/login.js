import connectDB from "../../config/connectDB";
import User from "../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export default async (req, res) => {
  const { username, password } = req.body;

  try {
    if (req.method === "POST") {
      if (!username || !password) {
        return res.status(422).json({ error: "Masukkan data kamu 🤬" });
      }
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "Akun tidak ditemukan 😤" });
      }
      const doMatch = await bcrypt.compare(password, user.password);
      if (doMatch) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        const { username, _id, name } = user;

        res.status(201).json({
          token,
          user: { username, _id, name },
          message: "login successful",
        });
      } else {
        return res.status(401).json({ error: "Password salah 🤐" });
      }
    } else {
      return res.status(401).json({ error: "Invalid credentials 🤯" });
    }
  } catch (err) {
    console.log(err);
  }
};
