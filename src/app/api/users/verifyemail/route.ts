import { connect } from "@/dbconfig/config";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/usermodel";
import jwt from 'jsonwebtoken'


connect()


export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token);

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }
        console.log(user);

        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        const response= NextResponse.json({
            message: "Email verified successfully",
            success: true
        });
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const tokenById = jwt.sign(tokenData, process.env.secret_token!, {
            expiresIn: "1d",
        });
        response.cookies.set('token', tokenById);
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}