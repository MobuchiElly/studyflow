import { NextResponse } from "next/server";
import {supabaseAdmin} from "@/lib/supabaseAdmin";


export async function POST(request: Request){
    const {email, password} = await request.json();

    try{
        const {data, error} = await supabaseAdmin.auth.signUp({
            email, password
        });
        if (error){
            console.error(error);
            return NextResponse.json({error: error.message}, {status: 400});
        };
        return NextResponse.json(
            {
                user: data.user,
                session: data.session
            },
            {
                status: 200
            })
    } catch(error: any){
        return NextResponse.json(
            {error: error.message}, 
            {status: 500})
    }
}