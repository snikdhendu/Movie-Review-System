import User from '@/models/userModel';
import nodemailer from 'nodemailer'

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //TODO
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken }
            )
        }




        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });

        const mailOption = {
            from: 'snikdhendupramanik@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your Password",
            html: "<b>Hello world?</b>", // HTML body
        }
        const mailResponse = await transporter.sendMail(mailOption);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message)
    }
}