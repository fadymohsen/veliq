import { NextResponse } from "next/server";
import { generateChallenge } from "@/lib/captcha";

export async function GET() {
  const { a, b, token } = generateChallenge();
  return NextResponse.json({ a, b, token });
}
