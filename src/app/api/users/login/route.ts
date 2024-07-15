import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/UserModel'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken"


connect()
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email,password } = reqBody 
        console.log(reqBody)
        
        const user = await User.findOne({ email })  
        if (!user) {
            return NextResponse.json({ error: 'User not found' },
                { status: 404 })
        }
        console.log("User Exits")
        const validPassword = bcryptjs.compare(password, user.password,)
        if(!validPassword){
            return NextResponse.json({ error: 'User not found, Check your Credential' },
            { status: 404 })
        }
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            
        }
        const token  = jwt.sign(tokenData, process.env.TOKEN_SECRET!,{ expiresIn: '1h' })

        const response = NextResponse.json({
            message:"Logged in success",
            success:true
        })
        response.cookies.set("token",token,{
            httpOnly:true,
            secure:true
            })
            return response
        
        

}
catch(error:any) {
    return NextResponse.json({ error: error.message },
        { status: 500 })
}
}