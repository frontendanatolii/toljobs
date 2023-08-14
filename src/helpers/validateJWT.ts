import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const validateJWT = async (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      throw new Error('No token found')
    }

    const decodedData: any = jwt.verify(token, process.env.jwt_secret!)
    return decodedData._id;
  } catch (error: any) {
    throw new Error(error.message)
  }
}