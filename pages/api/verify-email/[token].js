import connectDB from "../../../config/connectDB";
import User from "../../../models/user";
import jwt from "jsonwebtoken";

connectDB();

export default async function verifyEmail(req, res) {
  try {
    if (req.method === "PUT") {
      const { token } = req.query;

      if (!token) {
        return res.status(200).json({ message: "Tidak ada token 😢" });
      }

      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
      }

      const user = await User.findById(req.user._id);

      if (user) {
        user.emailVerified = true;
        user.emailToken = null;
        await user.save();

        return res
          .status(200)
          .json({ success: "Verifikasi email berhasil 🥳" });
      }
    } else {
      return res.status(401).json({ error: "Invalid credentials 🤯" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Token sudah tidak berlaku 😭" });
  }
}
