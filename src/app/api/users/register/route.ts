import { connectDB } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    //check if user exists already
    const user = await User.findOne({ email: reqBody.email });

    if (user) {
      throw new Error('User already exists');
    };

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(reqBody.password, salt);
    reqBody.password = hashedPassword;

    //create user
    await User.create(reqBody);

    return NextResponse.json({ message: 'User create successfully', success: true }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}