import { NextRequest, NextResponse } from "next/server";
import { getServerUser } from "./util/UserControllers";

export function middleware(request: NextRequest) {
  const user = getServerUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
