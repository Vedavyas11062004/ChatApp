import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { connect } from "@/dbconfig/config";
import User from "@/models/usermodel";

connect();
export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || "";
        const user:any = jwt.verify(token, process.env.secret_token!);
        const data=await User.findOne({_id: user.id}).select('-password');
        return NextResponse.json({
            status: 200,
            data: data
        })

    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }
}