import { connect } from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();
export async function POST(request: NextRequest) {

    const userId = await getDataFromToken(request)
    const user = await User.findById({ _id: userId }).select("-password").lean();

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }


    return NextResponse.json({
        message: "User found",
        data: user
    })



}
