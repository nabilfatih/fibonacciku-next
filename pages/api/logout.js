import { removeTokenCookie } from "../../lib/cookies";

export default async function Logout(req, res) {
  try {
    if (req.method === "POST") {
      removeTokenCookie(res);

      res.status(201).json({
        success: "Sampai jumpa lagi 🤩",
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials 🤯" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Gagal keluar 😭" });
  }
}
