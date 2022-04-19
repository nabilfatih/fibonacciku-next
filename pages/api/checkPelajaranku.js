import connectDB from "../../config/connectDB";
import PelajaranKu from "../../models/pelajaranku";

connectDB();

export default async function checkPelajaranku(req, res) {
  const { userId, username, pelajaran, bab, query, querybab, icon } = req.body;

  try {
    if (req.method === "PUT") {
      const pelajaranku = await PelajaranKu.findOne({
        userId: userId,
        username: username,
        pelajaran: pelajaran,
        bab: bab,
        query: query,
        querybab: querybab,
        icon: icon,
      });

      if (pelajaranku) {
        return res.status(200).json({
          success: `ada`,
        });
      } else {
        return res.status(200).json({
          success: `tidakAda`,
        });
      }
    } else {
      return res.status(401).json({ error: "Invalid credentials 🤯" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Gagal cek pelajaran 😭" });
  }
}
