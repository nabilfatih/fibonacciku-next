import connectDB from "../../config/connectDB";
import User from "../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import absoluteUrl from "next-absolute-url";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
connectDB();

export default async function Register(req, res) {
  const { email, nama, username, password, passwordConfirm } = req.body;

  try {
    if (req.method === "POST") {
      if (!email || !nama || !username || !password) {
        return res.status(422).json({ error: "Masukkan data kamu 🤬" });
      }

      if (password !== passwordConfirm) {
        return res.status(422).json({ error: "Password tidak sama 😤" });
      }

      const user = await User.findOne({
        $or: [{ email: email }, { username: username.toLowerCase() }],
      });

      if (user) {
        if (email == user.email) {
          return res.status(422).json({ error: "Email sudah dipakai 😤" });
        }
        if (username == user.username) {
          return res.status(422).json({ error: "username sudah dipakai 😤" });
        }
      }

      const HashedPassword = await bcrypt.hash(password, 12);
      const newUser = await new User({
        nama: nama,
        email: email,
        username: username.toLowerCase(),
        password: HashedPassword,
      }).save();

      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      newUser.emailToken = token;
      await newUser.save();

      const { origin } = absoluteUrl(req);
      const link = `${origin}/verify-email/${token}`;

      const msg = {
        from: "FibonacciKu <no-reply@fibonacciku.com>",
        to: email,
        subject: "FibonacciKu - Verifikasi Email",
        text: `
          Hai sobat Fibo! Terima kasih sudah mendaftar di FibonacciKu.
          Tolong copy dan paste link di bawah ini untuk verifikasi akun kamu.
          ${link}
        `.replace(/          /g, ""),
        html: `
          <h3>Hai sobat Fibo!</h3>
          <p>Terima kasih sudah mendaftar di FibonacciKu.</p>
          <p>Tolong klik link di bawah atau copy paste di browser kamu untuk verifikasi akun kamu.</p>
          <div>${link}</div>
          <p>Email verifikasi ini hanya dikirim 1 kali, jangan sampai hilang email ini. Jika hilang, maka kalian harus menunggu selama 1 hari untuk membuat ulang akun FibonacciKu dengan email yang sama.</p>
          <p>Terima Kasih, </p>
          <p>FibonacciKu</p>
        `,
      };
      await sgMail.send(msg);

      return res.status(200).json({
        message: `Cek email kamu untuk verifikasi 🤫`,
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials 🤯" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Gagal daftar 😭" });
  }
}
