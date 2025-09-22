import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

export async function POST(request: Request) {
    const { title, content, topic_id } = await request.json();
    const supabase = await createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
        return NextResponse.json({ error: 'Unauthorised request' }, { status: 401 });
    }

    const { data, error } = await supabase
        .from('notes')
        .insert([{ title, content, topic_id, user_id: userData.user.id }])
        .select();

    if (error) {
        console.error('Error creating note:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
}

export async function GET(request: Request) {
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const { data: notes, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', userData.user.id); // Filter by authenticated user's ID

    if (error) {
        console.error('Error fetching notes:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(notes, { status: 200 });
}