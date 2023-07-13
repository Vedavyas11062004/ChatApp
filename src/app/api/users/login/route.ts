import { connect } from "@/dbconfig/config";
import User from "@/models/usermodel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

connect();

export async function POST(request: NextRequest) {
    try {
        const requestbody = await request.json();
        const { email, password } = requestbody;

        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ error: "Could not find user" },
                { status: 400 });
        }
        const checkPassword = await bcryptjs.compare(password, user.password);
        if (!checkPassword) {
            return NextResponse.json({ error: "Incorrect password" },
                { status: 400 });
        }
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = jwt.sign(tokenData, process.env.secret_token!, {
            expiresIn: "1d",
        });
        const response = NextResponse.json({ message: "login successful", success: true });
        response.cookies.set("token", token, { httpOnly: true });
        return response;

    } catch (error) {
        return NextResponse.json({ error:"bad request from client" }, { status: 400 });
    }

}