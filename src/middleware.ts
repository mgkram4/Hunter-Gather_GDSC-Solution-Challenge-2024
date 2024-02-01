import { NextResponse } from "next/server";

/**
 * Middleware to add headers to the request, for accessing the origin and path in server components.
 *
 * @param {Request} request - The incoming request
 */
export function middleware(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  requestHeaders.set("x-origin", origin);
  requestHeaders.set("x-path", pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
