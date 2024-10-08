import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const revalidate = 0;

export async function GET() {
  const jsonDirectory = path.join(process.cwd(), `/src/db.json`);
  const fileContents = await fs.readFile(jsonDirectory, "utf8");
  const json = JSON.parse(fileContents);
  const data = { data: json.chats };
  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json(data);
}
