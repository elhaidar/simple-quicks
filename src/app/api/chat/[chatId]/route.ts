import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.json();
  return NextResponse.json(
    { data: res, success: true, message: "Success add new message" },
    { status: 201 }
  );
}
