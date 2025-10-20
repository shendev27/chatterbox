import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Password verification
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Validation functions
export function validateUsername(username: string): string | null {
  if (!username || username.length < 3) {
    return 'Username must be at least 3 characters';
  }
  if (username.length > 50) {
    return 'Username must be less than 50 characters';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password || password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (password.length > 100) {
    return 'Password must be less than 100 characters';
  }
  return null;
}

export function validateRoomName(roomName: string): string | null {
  if (!roomName || roomName.length < 1) {
    return 'Room name is required';
  }
  if (roomName.length > 24) {
    return 'Room name must be less than 24 characters';
  }
  if (!/^[a-zA-Z0-9]+$/.test(roomName)) {
    return 'Room name can only contain letters and numbers';
  }
  return null;
}

// Database operations
export async function createUser(
  username: string,
  password: string
): Promise<{ success: boolean; userId?: number; error?: string }> {
  try {
    const usernameError = validateUsername(username);
    if (usernameError) {
      return { success: false, error: usernameError };
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return { success: false, error: passwordError };
    }

    const hashedPassword = await hashPassword(password);

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          username,
          password_hash: hashedPassword,
        },
      ])
      .select('id')
      .single();

    if (error) {
      if (error.code === '23505') {
        return { success: false, error: 'Username already exists' };
      }
      return { success: false, error: 'Failed to create user' };
    }

    return { success: true, userId: data.id };
  } catch (error) {
    console.error('Create user error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function loginUser(
  username: string,
  password: string
): Promise<{ success: boolean; userId?: number; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, password_hash')
      .eq('username', username)
      .single();

    if (error || !data) {
      return { success: false, error: 'Invalid username or password' };
    }

    const isValid = await verifyPassword(password, data.password_hash);

    if (!isValid) {
      return { success: false, error: 'Invalid username or password' };
    }

    return { success: true, userId: data.id };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function createOrGetClerkUser(
  clerkUserId: string,
  email?: string
): Promise<{ success: boolean; userId?: number; error?: string }> {
  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_user_id', clerkUserId)
      .single();

    if (existingUser) {
      return { success: true, userId: existingUser.id };
    }

    // Create new user
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          clerk_user_id: clerkUserId,
          email,
        },
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Create Clerk user error:', error);
      return { success: false, error: 'Failed to create user' };
    }

    return { success: true, userId: data.id };
  } catch (error) {
    console.error('Create or get Clerk user error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}