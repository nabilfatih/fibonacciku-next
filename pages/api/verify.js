import { verifyToken } from "../../lib/utils";

export default async (req, res) => {
  const { token } = req.body;

  try {
    if (req.method === "PUT") {
      const userId = await verifyToken(token);
      if (userId) {
        return res.status(200).json({ userId: token });
      }
      return res.status(200).json({ userId: null });
    }
  } catch (e) {
    return res.status(401).json({ error: "Gagal masuk 😭" });
  }
};
