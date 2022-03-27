import connectDB from "../../config/connectDB";
import User from "../../models/user";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import absoluteUrl from "next-absolute-url";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
connectDB();

export default async (req, res) => {
  const { email } = req.body;

  try {
    if (req.method === "POST") {
      if (!email) {
        return res.status(422).json({ error: "Masukkan email kamu 🤬" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "Email tidak ditemukan 😭" });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 15 * 60,
      });

      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
      await user.save();

      const { origin } = absoluteUrl(req);
      const link = `${origin}/reset/${token}`;

      const msg = {
        from: "FibonacciKu <reset-password@fibonacciku.com>",
        to: email,
        subject: "FibonacciKu - Reset Password",
        text: `
            Hai sobat Fibo!
            Kamu mendapatkan email ini karena kamu (atau orang lain) ingin mereset/merubah password kamu.
            Tolong klik link di bawah atau copy paste di browser kamu untuk mereset password:
            ${link}
            Jika kamu permintaan reset password bukan dari kamu, tolong abaikan email ini dan password kamu tidak akan berubah.
        `.replace(/            /g, ""),
        html: `
            <h3>Hai sobat Fibo!</h3>
            <p>Kamu mendapatkan email ini karena kamu (atau orang lain) ingin mereset/merubah password kamu.</p>
            <p>Tolong klik link di bawah atau copy paste di browser kamu untuk mereset password:</p>
            <div>${link}</div>
            <p>Jika kamu permintaan reset password bukan dari kamu, tolong abaikan email ini dan password kamu tidak akan berubah.</p>
            <p>Terima Kasih, </p>
            <p>FibonacciKu</p>
        `,
      };
      await sgMail.send(msg);

      return res.status(200).json({ success: "Cek email kamu 🤫" });
    } else {
      return res.status(401).json({ error: "Invalid credentials 🤯" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Gagal reset password 😭" });
  }
};
