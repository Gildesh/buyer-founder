import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UTM_COOKIE_NAMES } from "@/lib/utm";

const MAX_AGE = 60 * 60 * 24 * 30;

function setUtmCookie(response: NextResponse, name: string, value: string) {
  response.cookies.set(name, value, {
    maxAge: MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const params = request.nextUrl.searchParams;

  const source = params.get("utm_source");
  const medium = params.get("utm_medium");
  const campaign = params.get("utm_campaign");

  if (source) setUtmCookie(response, UTM_COOKIE_NAMES.source, source.slice(0, 120));
  if (medium) setUtmCookie(response, UTM_COOKIE_NAMES.medium, medium.slice(0, 120));
  if (campaign) setUtmCookie(response, UTM_COOKIE_NAMES.campaign, campaign.slice(0, 120));

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
