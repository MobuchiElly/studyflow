// import { PUT, DELETE } from '@/app/api/notes/[id]/route';
// import { NextRequest } from 'next/server';
// import { mockSupabaseClient } from '@/lib/__mocks__/supabase';

// // Helper to build mock requests
// const mockRequest = (method: string, body?: any, headers?: HeadersInit) => {
//   return new NextRequest(
//     new Request('http://localhost/api/notes/123', {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//         ...headers,
//       },
//       body: body ? JSON.stringify(body) : undefined,
//     }),
//   );
// };

// describe('Notes API - /api/notes/[id]', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//     mockSupabaseClient.auth.getUser.mockReturnValue({
//       data: { user: { id: 'test-user-id' } },
//       error: null,
//     });
//   });

//   describe('PUT /api/notes/[id]', () => {
//     it('updates an existing note for the authenticated user', async () => {
//       const updatedNoteData = { title: 'Updated Title', content: 'Updated Content' };
//       const finalUpdatedNote = { id: '123', ...updatedNoteData, user_id: 'test-user-id' };

//       mockSupabaseClient.from().update.mockResolvedValueOnce({
//         data: [finalUpdatedNote],
//         error: null,
//       });

//       const request = mockRequest('PUT', updatedNoteData);
//       const response = await PUT(request, { params: { id: '123' } });
//       const data = await response.json();

//       expect(response.status).toBe(200);
//       expect(data).toEqual(finalUpdatedNote);
//       expect(mockSupabaseClient.from).toHaveBeenCalledWith('notes');
//       expect(mockSupabaseClient.from().update).toHaveBeenCalledWith(updatedNoteData);
//       expect(mockSupabaseClient.from().eq).toHaveBeenCalledWith('id', '123');
//       expect(mockSupabaseClient.from().eq).toHaveBeenCalledWith('user_id', 'test-user-id');
//     });

//     it('returns 404 if note to update is not found', async () => {
//       mockSupabaseClient.from().update.mockResolvedValueOnce({ data: [], error: null });

//       const request = mockRequest('PUT', { title: 'New Title' });
//       const response = await PUT(request, { params: { id: 'non-existent-id' } });
//       const data = await response.json();

//       expect(response.status).toBe(404);
//       expect(data.error).toBe('Note not found or unauthorized');
//     });

//     it('returns 401 if user is not authenticated', async () => {
//       mockSupabaseClient.auth.getUser.mockReturnValue({
//         data: { user: null },
//         error: null,
//       });

//       const request = mockRequest('PUT', { title: 'Fail Update' });
//       const response = await PUT(request, { params: { id: '123' } });
//       const data = await response.json();

//       expect(response.status).toBe(401);
//       expect(data.error).toBe('User not authenticated');
//     });
//   });

//   describe('DELETE /api/notes/[id]', () => {
//     it('deletes an existing note for the authenticated user', async () => {
//       mockSupabaseClient.from().delete.mockResolvedValueOnce({
//         data: [{ id: '123' }],
//         error: null,
//       });

//       const request = mockRequest('DELETE');
//       const response = await DELETE(request, { params: { id: '123' } });
//       const data = await response.json();

//       expect(response.status).toBe(200);
//       expect(data.message).toBe('Note deleted successfully');
//       expect(mockSupabaseClient.from).toHaveBeenCalledWith('notes');
//       expect(mockSupabaseClient.from().delete).toHaveBeenCalled();
//       expect(mockSupabaseClient.from().eq).toHaveBeenCalledWith('id', '123');
//       expect(mockSupabaseClient.from().eq).toHaveBeenCalledWith('user_id', 'test-user-id');
//     });

//     it('returns 401 if user is not authenticated', async () => {
//       mockSupabaseClient.auth.getUser.mockReturnValue({
//         data: { user: null },
//         error: null,
//       });

//       const request = mockRequest('DELETE');
//       const response = await DELETE(request, { params: { id: '123' } });
//       const data = await response.json();

//       expect(response.status).toBe(401);
//       expect(data.error).toBe('User not authenticated');
//     });

//     it('handles database errors during delete', async () => {
//       mockSupabaseClient.from().delete.mockResolvedValueOnce({
//         data: null,
//         error: { message: 'DB failure' },
//       });

//       const request = mockRequest('DELETE');
//       const response = await DELETE(request, { params: { id: '123' } });
//       const data = await response.json();

//       expect(response.status).toBe(500);
//       expect(data.error).toBe('DB failure');
//     });
//   });
// });
