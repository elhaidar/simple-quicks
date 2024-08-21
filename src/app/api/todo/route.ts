import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export async function GET() {
  const jsonDirectory = path.join(process.cwd(), `/src/db.json`);
  const fileContents = await fs.readFile(jsonDirectory, "utf8");
  const json = JSON.parse(fileContents);
  const data = { data: json.todos };
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const res = await req.json();
  return NextResponse.json(
    { data: res, success: true, message: "Success add new task" },
    { status: 201 }
  );
}
