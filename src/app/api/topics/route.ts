import { NextResponse } from "next/server";
import {createClient} from "@/lib/supabase/server";

export default async function POST(request: Request){
    const {title, description} = await request.json();
    const supabase = await createClient();
    
    const {data: userData, error: userError} = await supabase.auth.getUser();
    if (userError || !userData){
        return NextResponse.json({
            error: "Unauthorised request"
        },{
            status: 401
        })
    }
    const {data, error: topicInsertError} = await supabase
    .from("topics")
    .insert([{
        title,
        description,
        creator_id: userData.user.id
    }]);
    if (topicInsertError){
        console.log("error inserting topic:", topicInsertError);
        return NextResponse.json({error: topicInsertError.message},{status: 500});
    }
    return NextResponse.json(data?.[0] ?? {}, {status: 201})
}
