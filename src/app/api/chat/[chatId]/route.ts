import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.json();
  await new Promise((resolve) => setTimeout(resolve, 50));
  return NextResponse.json(
    { data: res, success: true, message: "Success add new message" },
    { status: 201 }
  );
}
