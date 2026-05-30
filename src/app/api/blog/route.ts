import { NextRequest, NextResponse } from "next/server";
import { blogPosts } from "@/lib/catalog";

export async function GET() {
  return NextResponse.json(blogPosts);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    return NextResponse.json({ ...data, id: `post-${Date.now()}` }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
