export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/projects/:path*",
    "/tasks/:path*",
    "/messages/:path*",
    "/notifications/:path*",
    "/view-tickets/:path*",
  ],
};