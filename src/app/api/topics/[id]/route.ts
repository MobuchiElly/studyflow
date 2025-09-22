import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Handles PUT requests to update an existing topic.
 *
 * @param {Request} request - The incoming request object containing the updated topic data (title, description).
 * @param {{ params: { id: string } }} { params } - The parameters object containing the topic ID.
 * @returns {Promise<NextResponse>} A JSON response with the updated topic or an error message.
 */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { title, description, topic_id } = await request.json();
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const { data, error } = await supabase
        .from('topics')
        .update({ title, description, topic_id })
        .eq('id', id)
        .eq('user_id', userData.user.id) // Ensure user owns the topic
        .select();

    if (error) {
        console.error('Error updating topic:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
        return NextResponse.json({ error: 'Topic not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json(data[0], { status: 200 });
}

/**
 * Handles DELETE requests to delete an existing topic.
 *
 * @param {Request} request - The incoming request object.
 * @param {{ params: { id: string } }} { params } - The parameters object containing the topic ID.
 * @returns {Promise<NextResponse>} A JSON response indicating success or an error message.
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const {id} = params;
    const supabase = await createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const { error } = await supabase
        .from('topics')
        .delete()
        .eq('id', id)
        .eq('user_id', userData.user.id); // Ensure user owns the topic

    if (error) {
        console.error('Error deleting topic:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Topic deleted successfully' }, { status: 200 });
}