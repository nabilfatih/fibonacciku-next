import { NextResponse } from "next/server";
import { verifyToken } from "../../lib/utils";

export async function middleware(req) {
  
  const user = req ? req.cookies?.user : null;
  const token = req ? req.cookies?.token : null;
  const userId = await verifyToken(token);
 
  const { pathname } = req.nextUrl;

  if (!userId || !user) {
    return NextResponse.rewrite(new URL("/masuk", req.url));
  }

  if (userId) {
    return NextResponse.next();
  }
}
