import nodemailer from 'nodemailer';
import User from '@/models/usermodel';
import bcrypt from 'bcryptjs'

export async function createmail({ email, emailType, userId }: any) {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }
        console.log(process.env.email);
        console.log(process.env.password);
        
        var transport = nodemailer.createTransport({
            // host: "sandbox.smtp.mailtrap.io",
            // port: 2525,
            service:'gmail',
            auth: {
                user: "csc06498@gmail.com",
                pass: "sizguumraoldgwsw",
            }
        });
        const info = await transport.sendMail({
            from: "csc06498@gmail.com", // sender address
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.domain}/verifyemail?token=${hashedToken}
            </p>`
        });
        return info;
    } catch (error: any) {
        throw new Error(error.message)
    }

}