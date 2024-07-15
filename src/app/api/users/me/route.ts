import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request:NextRequest){

  
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        
        }) 

}