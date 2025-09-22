// src/lib/__mocks__/supabase.ts
const queryBuilder = {
  insert: jest.fn().mockResolvedValue({ data: null, error: null }),
  update: jest.fn().mockResolvedValue({ data: null, error: null }),
  delete: jest.fn().mockResolvedValue({ data: null, error: null }),
  select: jest.fn().mockResolvedValue({ data: null, error: null }),
  eq: jest.fn().mockReturnThis(),
  single: jest.fn().mockReturnThis(),
};

export const mockSupabaseClient = {
  from: jest.fn(() => queryBuilder),
  auth: {
    getUser: jest.fn(() => ({
      data: { user: { id: 'test-user-id' } },
      error: null,
    })),
    signInWithPassword: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
  },
};

export const createClient = jest.fn(() => mockSupabaseClient);
export const createServerClient = jest.fn(() => mockSupabaseClient);