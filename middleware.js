import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY ="heythere";

export function middleware(req) {
     const token = req.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
      if(token)
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }
  }
  

export const config = {
  matcher: ["/dashboard/:path*"], 
};
