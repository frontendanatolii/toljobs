import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: 'Successfully log out',
      success: true,
      data: null,
    });

    response.cookies.set('token', '', { maxAge: 0 });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}