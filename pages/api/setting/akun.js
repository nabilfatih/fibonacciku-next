import connectDB from "../../../config/connectDB";
import User from "../../../models/user";
import jwt from "jsonwebtoken";

connectDB();

export default async (req, res) => {
  try {
    if (req.method === "PUT") {
      const data = req.body;

      const user = await User.findOne({ username: data.usernameLama });

      if (data.username == user.username) {
        return res.status(401).json({ error: "Username sudah ada 🤯" });
      }
      if (data.email == user.email) {
        return res.status(401).json({ error: "Email sudah ada 🤯" });
      }
      console.log(user);

      user.username = data.username;
      user.nama = data.nama;
      user.email = data.email;
      user.bio = data.bio;
      user.website = data.website;
      user.instagram = data.instagram;
      user.github = data.github;
      user.twitter = data.twitter;

      await user.save();

      const { username, _id, nama, avatar } = user;

      res.status(201).json({
        user: { username, _id, nama, avatar },
        success: "Berhasil perbarui profil 🤩",
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials 🤯" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Gagal perbarui profil 😭" });
  }
};
