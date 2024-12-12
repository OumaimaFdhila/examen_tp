import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {

    const token = await getToken({ req: request });
    console.log("middleware", token);
    
    if (!token) {
      if (request.nextUrl.pathname.startsWith("/users") ) {
        return NextResponse.redirect(new URL("/?login=true", request.url));
      }

    }
    
    return NextResponse.next();

  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.error();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
