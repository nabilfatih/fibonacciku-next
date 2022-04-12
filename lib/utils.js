import { jwtVerify } from "jose";

export async function verifyToken(token) {
  if (token) {
    try {
      const { payload, protectedHeader } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const userId = payload.userId;
      if (!userId) return null;
      return userId;
    } catch (e) {
      return null;
    }
  }
  return null;
}
