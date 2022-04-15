import connectDB from "../../config/connectDB";
import User from "../../models/user";

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

        const { username, _id, nama, avatar } = user;

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
