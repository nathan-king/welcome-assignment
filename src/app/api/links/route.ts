import { getLinks } from "@/lib/links";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    links: getLinks(),
  });
}
