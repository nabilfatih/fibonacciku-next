import jwt from "jsonwebtoken";

export default async function Verify(req, res) {
  const { token } = req.body;

  try {
    if (req.method === "PUT") {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
          return res.status(200).json({ userId: decoded });
        }
        return res.status(200).json({ userId: null });
      }
      return res.status(200).json({ userId: null });
    }
  } catch (e) {
    return res.status(401).json({ error: "Gagal masuk 😭" });
  }
}
