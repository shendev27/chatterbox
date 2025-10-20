import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

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
  if (username.length > 24) {
    return 'Username must be less than 24 characters';
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return 'Username can only contain letters and numbers';
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (password.length > 100) {
    return 'Password must be less than 100 characters';
  }
  return null;
}

// Generate random guest username
function generateGuestUsername(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `Guest${randomNum}`;
}

// Create new user account
export async function createAccount(
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
          is_guest: false,
        },
      ])
      .select('id')
      .single();

    if (error) {
      if (error.code === '23505') {
        return { success: false, error: 'Username already taken' };
      }
      return { success: false, error: 'Failed to create account' };
    }

    return { success: true, userId: data.id };
  } catch (error) {
    console.error('Create account error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// Login with username and password
export async function login(
  username: string,
  password: string
): Promise<{ success: boolean; userId?: number; username?: string; error?: string }> {
  try {
    if (!username || !password) {
      return { success: false, error: 'Please enter both username and password' };
    }

    const { data, error } = await supabase
      .from('users')
      .select('id, username, password_hash, is_guest')
      .eq('username', username)
      .single();

    if (error || !data) {
      return { success: false, error: 'Invalid username or password' };
    }

    if (data.is_guest) {
      return { success: false, error: 'Cannot log in to guest account' };
    }

    const isValid = await verifyPassword(password, data.password_hash);

    if (!isValid) {
      return { success: false, error: 'Invalid username or password' };
    }

    return { success: true, userId: data.id, username: data.username };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// Create guest session
export async function createGuestSession(): Promise<{
  success: boolean;
  userId?: number;
  username?: string;
  error?: string;
}> {
  try {
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      const guestUsername = generateGuestUsername();

      // Try to create guest with this username
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            username: guestUsername,
            password_hash: await hashPassword(Math.random().toString(36)),
            is_guest: true,
          },
        ])
        .select('id, username')
        .single();

      if (!error && data) {
        return {
          success: true,
          userId: data.id,
          username: data.username,
        };
      }

      // If username collision, try again
      if (error?.code === '23505') {
        attempts++;
        continue;
      }

      // Other errors
      return { success: false, error: 'Failed to create guest session' };
    }

    return { success: false, error: 'Failed to generate unique guest name' };
  } catch (error) {
    console.error('Guest session error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}