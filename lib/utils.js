import jwt from "@tsndr/cloudflare-worker-jwt";

export async function verifyToken(token) {
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedToken) return null;

      return decodedToken;
    } catch (e) {
      return null;
    }
  }
  return null;
}
