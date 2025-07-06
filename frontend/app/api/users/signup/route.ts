import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log('✅ Body received:', reqBody);

        const existingUser = await User.findOne({ email });
        console.log('🔍 Checked for existing user:', existingUser);

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        console.log('🧂 Salt generated');

        const hashedPassword = await bcryptjs.hash(password, salt);
        console.log('🔐 Password hashed');

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log('📦 User saved to DB:', savedUser);

        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
        console.log('📨 Email sent');

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        }, { status: 201 });

    } catch (error: any) {
        console.error('❌ Error in signup route:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
