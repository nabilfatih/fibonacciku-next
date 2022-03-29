import { NextResponse } from "next/server";
import { verifyToken } from "../lib/utils";

export async function middleware(req, ev) {
  const token = req ? req.cookies?.token : null;
  const userId = await verifyToken(token);

  const { pathname } = req.nextUrl;

  if (pathname.includes("/masuk") || pathname.includes("/daftar")) {
    if (userId) {
      return NextResponse.redirect(new URL("/mata-pelajaran", req.url));
    }
    return NextResponse.next();
  }
}
