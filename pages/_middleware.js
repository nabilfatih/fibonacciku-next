import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req) {
  const user = req ? req.cookies?.user : null;
  const token = req ? req.cookies?.token : null;
  let userId;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      userId = decodedToken?.userId;
    } catch (e) {
      userId = null;
    }
  } else {
    userId = null;
  }

  const { pathname } = req.nextUrl;

  if (
    pathname.includes("/masuk") ||
    pathname.includes("/daftar") ||
    pathname.includes("/reset") ||
    pathname.includes("/verify-email")
  ) {
    if (!userId || !user) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/beranda", req.url));
  }
}
