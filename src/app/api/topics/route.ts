import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

/**
 * Handles POST requests to create a new topic.
 *
 * @param {Request} request - The incoming request object containing the topic data (title, description).
 * @returns {Promise<NextResponse>} A JSON response with the created topic or an error message.
 */
export async function POST(request: Request) {
    const { title, description } = await request.json();
    const supabase = await createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
        return NextResponse.json({ error: 'Unauthorised request' }, { status: 401 });
    }

    const { data, error } = await supabase
        .from('topics')
        .insert([{ title, description, user_id: userData.user.id }])
        .select();

    if (error) {
        console.error('Error creating topic:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
}

/**
 * Handles GET requests to retrieve all topics for the authenticated user.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} A JSON response with an array of topics or an error message.
 */
export async function GET(request: Request) {
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    console.log("err:", userError);
    if (userError || !userData?.user) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const { data: topics, error } = await supabase
        .from('topics')
        .select('*')
        .eq('user_id', userData.user.id); // Filter by authenticated user's ID

    if (error) {
        console.error('Error fetching topics:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(topics, { status: 200 });
}