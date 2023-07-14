import { connect } from "@/dbconfig/config";
import User from "@/models/usermodel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { createmail } from "@/helpers/mailer";


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "User already exists" }, {
                status: 400
            })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        })
        console.log(newUser);
        const emailSender = await createmail({ email, emailType: "VERIFY", userId: newUser._id })

        return NextResponse.json({ msg: newUser }, {
            status: 200
        })
        // if the response was not sent it will give the 500 status error

    } catch (error) {
        return NextResponse.json({ error }, {
            status: 400
        })
    }
}
