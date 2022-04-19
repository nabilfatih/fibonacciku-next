import connectDB from "../../config/connectDB";
import PelajaranKu from "../../models/pelajaranku";

connectDB();

export default async function Pelajaranku(req, res) {
  const { userId, username, pelajaran, bab, query, querybab, icon } = req.body;

  try {
    if (req.method === "POST") {
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
          success: `pelajaran sudah ditambahkan 🥳`,
        });
      }

      const newPelajaranKu = await new PelajaranKu({
        userId,
        username,
        pelajaran,
        bab,
        query,
        querybab,
        icon,
      });

      await newPelajaranKu.save();

      return res.status(200).json({
        success: `Sukses menambah pelajaran 🥳`,
      });
    }

    if (req.method === "PUT") {
      const pelajaranku = await PelajaranKu.findOneAndRemove({
        userId: userId,
        username: username,
        pelajaran: pelajaran,
        bab: bab,
        query: query,
        querybab: querybab,
        icon: icon,
      });

      return res.status(200).json({
        success: `Sukses menghapus pelajaran 🥳`,
      });
    }
  } catch (e) {
    return res.status(401).json({ error: "Error! kontak FibonacciKu 😭" });
  }
}
