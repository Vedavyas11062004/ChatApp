import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await NextResponse.json({ message: "logout successfully", success: true });
        // response.cookies.set("token", "", { httpOnly: true });
        response.cookies.delete("token");
        return response;

    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }
}