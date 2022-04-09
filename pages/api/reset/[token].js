import connectDB from "../../../config/connectDB";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
connectDB();

export default async (req, res) => {
  try {
    if (req.method === "PUT") {
      const { token } = req.query;

      const { password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Password tidak sama" });
      }
      if (password.length < 8) {
        return res.status(400).json({ error: "Password min. 8 karakter" });
      }

      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
      }

      const user = await User.findById(req.user._id);

      if (user) {
        user.password = await bcrypt.hash(password, 12);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        const msg = {
          from: "FibonacciKu <reset-password@fibonacciku.com>",
          to: user.email,
          subject: "FibonacciKu - Password Berubah",
          text: `
            Hai sobat Fibo!
            Email ini utuk menkonfirmasi bahwa password akun kamu sudah berubah.
            Jika kamu tidak merubah password kamu, tolong kontak kita dengan fitur kontak di FibonacciKu.
        `.replace(/            /g, ""),
          html: `
            <h3>Hai sobat Fibo!</h3>
            <p>Email ini utuk menkonfirmasi bahwa password akun kamu sudah berubah.</p>
            <p>Jika kamu tidak merubah password kamu, tolong kontak kita dengan fitur kontak di FibonacciKu.</p>
            <p>Terima Kasih, </p>
            <p>FibonacciKu</p>
        `,
        };
        await sgMail.send(msg);

        return res.status(200).json({ success: "Berhasil ganti password 🤩" });
      }
    } else {
      return res.status(401).json({ error: "Invalid credentials 🤯" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Token sudah tidak berlaku 😭" });
  }
};
