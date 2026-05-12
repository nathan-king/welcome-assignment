import { getLinkByCode, incrementClickCount } from "@/lib/links";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ code: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { code } = await context.params;

  const link = getLinkByCode(code);

  if (!link) {
    return new NextResponse("Not found", { status: 404 });
  }

  incrementClickCount(code);

  return NextResponse.redirect(link.originalUrl, 302);
}
