import connectDB from "../../config/connectDB";
import User from "../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import absoluteUrl from "next-absolute-url";

connectDB();

export default async (req, res) => {
  const { email, nama, username, password } = req.body;

  try {
    if (req.method === "POST") {
      if (!email || !nama || !username || !password) {
        return res.status(422).json({ error: "Masukkan data kamu 🤬" });
      }

      const user = await User.findOne({
        $or: [{ email: email }, { username: username }],
      });

      if (user) {
        return res.status(422).json({ error: "Akun sudah ada 😤" });
      }

      const HashedPassword = await bcrypt.hash(password, 12);
      const newUser = await new User({
        nama: nama,
        email: email,
        username: username,
        password: HashedPassword,
      }).save();

      console.log(newUser);

      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      newUser.emailToken = token;
      await newUser.save();

      // const { origin } = absoluteUrl(req);
      // const link = `${origin}/src/user/email/${token}`;

      return res.status(200).json({
        message: `Email sent to ${newUser.email}, please check your email`,
      })
    }
  } catch (e) {
    console.log(e);
  }
};
