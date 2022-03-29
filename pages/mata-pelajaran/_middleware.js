import { NextResponse } from "next/server";
import { verifyToken } from "../../lib/utils";

export async function middleware(req, ev) {
  
  const user = req ? req.cookies?.user : null;
  const token = req ? req.cookies?.token : null;
  const userId = await verifyToken(token);
  console.log(userId)
  const url = req.nextUrl.clone();
  url.pathname = "/masuk";

  if (!token || !user) {
    return NextResponse.redirect(url);
  }

  if (userId) {
    return NextResponse.next();
  }
}
