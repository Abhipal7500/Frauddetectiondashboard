import { NextResponse } from "next/server";
import { fraudData } from "@/data/fraudData";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY ="heythere"; 
export async function POST(req) {
  const { email, password } = await req.json();
  const user = fraudData.user_authentication.find((u) => u.email === email);

  if (!user || password!= user.password_hashed) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

  const response = NextResponse.json({ message: "Login successful" });
  response.headers.set("Set-Cookie", `auth_token=${token}; HttpOnly; Secure; Path=/`);


  return response;
}
