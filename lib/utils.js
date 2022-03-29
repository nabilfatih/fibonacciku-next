import jwt from "jsonwebtoken";

export async function verifyToken(token) {
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const userId = decodedToken?.userId;
      return userId;
    } catch (e) {
      return null;
    }
  }
  return null;
}
