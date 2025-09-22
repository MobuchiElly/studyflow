// jest.setup.ts
jest.mock('@/lib/supabase', () => require('@/lib/__mocks__/supabase'));
jest.mock('@/lib/supabase/server', () => require('@/lib/__mocks__/supabase'));

import { cookies } from "next/headers";

// Mock Next.js cookies so tests don’t error
jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

(cookies as jest.Mock).mockReturnValue({
  get: jest.fn().mockReturnValue({ value: "fake-token" }),
});
