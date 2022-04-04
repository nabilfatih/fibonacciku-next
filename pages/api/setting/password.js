import connectDB from "../../../config/connectDB";
import User from "../../../models/user";
import bcrypt from "bcryptjs";

connectDB();

export default async (req, res) => {
  try {
    if (req.method === "PUT") {
      const { username, passwordLama, passwordBaru, passwordKonfirmasi } =
        req.body;

      if (passwordBaru !== passwordKonfirmasi) {
        return res.status(400).json({ error: "Password tidak sama" });
      }
      if (passwordBaru.length < 8) {
        return res.status(400).json({ error: "Password min. 8 karakter" });
      }

      const user = await User.findOne({ username: username });
      const doMatch = await bcrypt.compare(passwordLama, user.password);

      if (doMatch) {
        const HashedPassword = await bcrypt.hash(passwordBaru, 12);
        user.password = HashedPassword;
        await user.save();

        return res.status(200).json({ success: "Berhasil ganti password 🤩" });
      } else {
        return res.status(401).json({ error: "Password lama salah 🤐" });
      }
    } else {
      return res.status(401).json({ error: "Invalid credentials 🤯" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Gagal ganti password 😭" });
  }
};
