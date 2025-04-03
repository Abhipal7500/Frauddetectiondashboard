import { NextResponse } from "next/server";
import { fraudData } from "@/data/fraudData";

export async function GET() {
  return NextResponse.json(fraudData);
}
