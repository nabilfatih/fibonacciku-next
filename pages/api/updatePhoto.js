import connectDB from "../../config/connectDB";
import User from "../../models/user";
import jwt from "jsonwebtoken";
import { setTokenCookie } from "../../lib/cookies";

connectDB();

export default async function updatePhoto(req, res) {
  try {
    if (req.method === "PUT") {
      const { username, path, filename } = req.body;

      const user = await User.findOne({ username: username });

      try {
        user.avatar.path = path;
        user.avatar.filename = filename;

        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "3d",
        });

        const { username, _id, nama, avatar } = user;

        setTokenCookie(token, res);

        res.status(201).json({
          user: { username, _id, nama, avatar },
          success: "Berhasil perbarui profil 🤩",
        });
      } catch (e) {
        return res.status(401).json({ error: "Gagal perbarui profil 😭" });
      }
    } else {
      return res.status(401).json({ error: "Invalid credentials 🤯" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Gagal perbarui profil 😭" });
  }
}
