// import { GET, POST } from '@/app/api/notes/route';
// import { NextRequest } from 'next/server';
// import { mockSupabaseClient } from '@/lib/__mocks__/supabase';

// // Helper to build mock requests
// const mockRequest = (method: string, body?: any, headers?: HeadersInit) => {
//   return new NextRequest(
//     new Request('http://localhost/api/notes', {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//         ...headers,
//       },
//       body: body ? JSON.stringify(body) : undefined,
//     }),
//   );
// };

// describe('Notes API - /api/notes', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//     mockSupabaseClient.auth.getUser.mockReturnValue({
//       data: { user: { id: 'test-user-id' } },
//       error: null,
//     });
//   });

//   describe('GET /api/notes', () => {
//     it('returns all notes for the authenticated user', async () => {
//       const mockNotes = [
//         { id: '1', title: 'Note 1', content: 'Content 1', user_id: 'test-user-id' },
//         { id: '2', title: 'Note 2', content: 'Content 2', user_id: 'test-user-id' },
//       ];

//       mockSupabaseClient.from().select.mockResolvedValueOnce({ data: mockNotes, error: null });

//       const request = mockRequest('GET');
//       const response = await GET(request);
//       const data = await response.json();

//       expect(response.status).toBe(200);
//       expect(data).toEqual(mockNotes);
//       expect(mockSupabaseClient.from).toHaveBeenCalledWith('notes');
//       expect(mockSupabaseClient.from().select).toHaveBeenCalledWith('*');
//       expect(mockSupabaseClient.from().eq).toHaveBeenCalledWith('user_id', 'test-user-id');
//     });

//     it('returns 401 if user is not authenticated', async () => {
//       mockSupabaseClient.auth.getUser.mockReturnValue({
//         data: { user: null },
//         error: null,
//       });

//       const request = mockRequest('GET');
//       const response = await GET(request);
//       const data = await response.json();

//       expect(response.status).toBe(401);
//       expect(data.error).toBe('User not authenticated');
//     });

//     it('handles database errors', async () => {
//       mockSupabaseClient.from().select.mockResolvedValueOnce({
//         data: null,
//         error: { message: 'DB Error' },
//       });

//       const request = mockRequest('GET');
//       const response = await GET(request);
//       const data = await response.json();

//       expect(response.status).toBe(500);
//       expect(data.error).toBe('DB Error');
//     });
//   });

//   describe('POST /api/notes', () => {
//     it('creates a new note for the authenticated user', async () => {
//       const newNote = { title: 'New Note', content: 'New Content' };
//       const createdNote = { id: '3', ...newNote, user_id: 'test-user-id' };

//       mockSupabaseClient.from().insert.mockResolvedValueOnce({ data: [createdNote], error: null });

//       const request = mockRequest('POST', newNote);
//       const response = await POST(request);
//       const data = await response.json();

//       expect(response.status).toBe(201);
//       expect(data).toEqual(createdNote);
//       expect(mockSupabaseClient.from).toHaveBeenCalledWith('notes');
//       expect(mockSupabaseClient.from().insert).toHaveBeenCalledWith({
//         ...newNote,
//         user_id: 'test-user-id',
//       });
//       expect(mockSupabaseClient.from().select).toHaveBeenCalled();
//     });

//     it('returns 400 if required fields are missing', async () => {
//       const invalidNote = { content: 'Missing Title' };

//       const request = mockRequest('POST', invalidNote);
//       const response = await POST(request);
//       const data = await response.json();

//       expect(response.status).toBe(400);
//       expect(data.error).toBe('Title is required');
//     });

//     it('returns 401 if user is not authenticated', async () => {
//       mockSupabaseClient.auth.getUser.mockReturnValue({
//         data: { user: null },
//         error: null,
//       });

//       const newNote = { title: 'New Note', content: 'New Content' };
//       const request = mockRequest('POST', newNote);
//       const response = await POST(request);
//       const data = await response.json();

//       expect(response.status).toBe(401);
//       expect(data.error).toBe('User not authenticated');
//     });

//     it('handles database errors during creation', async () => {
//       const newNote = { title: 'New Note', content: 'New Content' };
//       mockSupabaseClient.from().insert.mockResolvedValueOnce({
//         data: null,
//         error: { message: 'DB Insert Error' },
//       });

//       const request = mockRequest('POST', newNote);
//       const response = await POST(request);
//       const data = await response.json();

//       expect(response.status).toBe(500);
//       expect(data.error).toBe('DB Insert Error');
//     });
//   });
// });