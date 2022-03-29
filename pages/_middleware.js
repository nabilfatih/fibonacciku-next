import { NextResponse } from "next/server";
import { verifyToken } from "../lib/utils";

export async function middleware(req) {
  const token = req ? req.cookies?.token : null;
  const userId = await verifyToken(token);

  const { pathname } = req.nextUrl;

  if (
    pathname.includes("/masuk") ||
    pathname.includes("/daftar") ||
    pathname.includes("/reset") ||
    pathname.includes("/verify-email")
  ) {
    if (userId) {
      return NextResponse.redirect(new URL("/beranda", req.url));
    }
    return NextResponse.next();
  }
}
