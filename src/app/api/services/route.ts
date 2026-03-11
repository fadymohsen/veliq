import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src/app/data/services.json");

export async function GET() {
  const data = await fs.readFile(DATA_PATH, "utf-8");
  return NextResponse.json(JSON.parse(data));
}

export async function PUT(req: Request) {
  const body = await req.json();

  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected an array of services" }, { status: 400 });
  }

  for (const s of body) {
    if (!s.icon || !s.title || !s.desc) {
      return NextResponse.json(
        { error: "Each service must have icon, title, and desc" },
        { status: 400 }
      );
    }
  }

  const services = body.map((s: { icon: string; title: string; desc: string }, i: number) => ({
    id: i + 1,
    icon: s.icon,
    title: s.title,
    desc: s.desc,
  }));

  await fs.writeFile(DATA_PATH, JSON.stringify(services, null, 2) + "\n");
  return NextResponse.json(services);
}
