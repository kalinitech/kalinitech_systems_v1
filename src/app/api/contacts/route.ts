import { NextRequest, NextResponse } from "next/server";

// In-memory contacts storage (resets on serverless cold start)
const contacts: Array<Record<string, unknown>> = [];

export async function GET() {
  return NextResponse.json(contacts);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const contact = { ...data, id: `contact-${Date.now()}`, createdAt: new Date().toISOString() };
    contacts.push(contact);
    return NextResponse.json(contact, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
  }
}
