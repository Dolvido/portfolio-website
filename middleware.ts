import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Handle WASM file requests
  if (request.nextUrl.pathname.endsWith('.wasm')) {
    const response = await fetch(request.url);
    const wasmBuffer = await response.arrayBuffer();
    
    return new NextResponse(wasmBuffer, {
      headers: {
        'Content-Type': 'application/wasm',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Cache-Control': 'no-cache',
        'Content-Length': wasmBuffer.byteLength.toString(),
      },
    });
  }

  // Handle model file requests
  if (request.nextUrl.pathname.includes('models/') || request.nextUrl.pathname.endsWith('.onnx')) {
    const response = await fetch(request.url);
    const buffer = await response.arrayBuffer();
    
    return new NextResponse(buffer, {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Cache-Control': 'no-cache',
        'Content-Length': buffer.byteLength.toString(),
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 