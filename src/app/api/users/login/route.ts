import { connectDB } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
connectDB();

export async function POST(request: NextRequest) {
  try {
    
    const reqBody = await request.json();

    //check if user exists already
    const user = await User.findOne({ email: reqBody.email });

    if (!user) {
      throw new Error('User does not exists');
    };

    //compare password
    const isPasswordsMatch = await bcryptjs.compare(reqBody.password, user.password);

    if (!isPasswordsMatch) {
      throw new Error('Invalid credentials');
    };

    const dataToEncrypt = {
      _id: user._id,
      name: user.name,
      email: user.email,
    }
  
    const token = jwt.sign(dataToEncrypt, process.env.jwt_secret!, {
      expiresIn: '1d',
    });
  
    const response = NextResponse.json({
      message: 'Successfully log in',
      success: true,
      data: null,
    });
  
    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}