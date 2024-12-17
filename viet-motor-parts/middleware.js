import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const excludedPaths = ['/_next/static/css/app/(default)/ReactToastify.css.map'];

  if (excludedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }
  // Get the token from cookies
  const token = request.cookies.get('token')?.value;

  if (!token) {
    console.log('No token found, redirecting to /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Decode and verify the token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Log the payload for debugging
    console.log('Token payload:', payload);

    // Allow the request to continue
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    // Redirect to login if verification fails
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/orders/admin/:path*',
    '/products/add/:path*',
    '/products/:id/edit',
    '/categories/:path*',
    '/vehicles/:path*',
  ],
};
