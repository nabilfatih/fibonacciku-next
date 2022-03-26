import connectDB from "../../config/connectDB";
import User from "../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import absoluteUrl from "next-absolute-url";

connectDB();

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email, nama, username, password } = req.body;

      const user = await User.findOne({ email: email });

      if (user) {
        return res.status(422).json({ error: "User already exists" });
      }

      const HashedPassword = await bcrypt.hash(password, 12);
      const newUser = await new User({
        name: nama,
        email: email,
        username: username,
        password: HashedPassword,
      }).save();

      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      newUser.emailToken = token;
      await newUser.save();

      const { origin } = absoluteUrl(req);
      // const link = `${origin}/src/user/email/${token}`;
    }
  } catch (e) {
    console.log(error);
  }
};
