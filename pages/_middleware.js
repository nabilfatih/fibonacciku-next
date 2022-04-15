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
    pathname.includes("/verify-email") ||
    pathname.includes("/lupa-password")
  ) {
    if (!userId) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/beranda", req.url));
  }

  if (
    pathname.includes("/mata-pelajaran") ||
    pathname.includes("/pengaturan") ||
    pathname.includes("/beranda")
  ) {
    if (!userId) {
      return NextResponse.rewrite(new URL("/masuk", req.url));
    }
    return NextResponse.next();
  }
}
