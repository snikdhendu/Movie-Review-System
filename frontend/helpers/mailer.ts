import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer'

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //TODO
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }
            )
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "8ce98c5164d408",
                pass: "b8dc36b68bbaa5"
            }
        });

        const mailOption = {
            from: 'snikdhendupramanik@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here </a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy paste the link below in your browser ${process.env}<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        }
        const mailResponse = await transport.sendMail(mailOption);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message)
    }
}