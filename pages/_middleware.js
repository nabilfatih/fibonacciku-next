import { NextResponse } from "next/server";
import { verifyToken } from "../lib/utils";

export async function middleware(req) {
  const user = req ? req.cookies?.user : null;
  const token = req ? req.cookies?.token : null;
  const userId = await verifyToken(token);

  const { pathname } = req.nextUrl;

  if (!userId || !user) {
    if (
      pathname.includes("/masuk") ||
      pathname.includes("/daftar") ||
      pathname.includes("/reset") ||
      pathname.includes("/verify-email") ||
      pathname.includes("/lupa-password")
    ) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/beranda", req.url));
}
