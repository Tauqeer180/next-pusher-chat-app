import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const authToken = request.cookies.get("token")?.value;
  // const permissions = request.cookies.get("permissions")?.value;
  let pathname = request.nextUrl.pathname;
  // console.log("middleware:" , permissions)
  // console.log("Path Name from Middleware ", pathname, permissions);
  // console.log(
  //   "Permissions from Middleware ",
  //   permissions &&
  //     !JSON.parse(permissions).some((permittedRoute) =>
  //       pathname.startsWith(permittedRoute)
  //     )
  // );

  // permissions.some(permittedRoute => route.startsWith(permittedRoute));
  const logedUserNotAccessPath = pathname === "/login";
  if (pathname == "/login" || pathname == "/register") {
    // acessing the ot secure route without token, redirect to login page
    if (authToken) {
      return NextResponse.redirect(new URL("/chat", request.url));
    }
  } else {
    // accessing the secure route
    if (pathname === "/") {
      // Perform the redirect to "/chat"
      return NextResponse.redirect(new URL("/chat", request.url));
    }
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/chat", "/login", "/chat/:path*"],
};
