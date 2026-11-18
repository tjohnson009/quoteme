import dotenv from 'dotenv';
dotenv.config(); 
import { createClient, SupabaseClient } from '@supabase/supabase-js'; 
import { Request } from 'express';

const supabaseUrl = process.env.SUPABASE_URL; 
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// for signup/login
export const supabase = createClient(supabaseUrl!, supabaseServiceRoleKey!);

// ADMIN client (for the demo: adding sample quotes and cleaning up old demo accounts)
// never log in with this one, so it always acts as the server and not as a user
export const supabaseAdmin = createClient(supabaseUrl!, supabaseServiceRoleKey!, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});

// TOKEN based client (for authenticated requests only)
export function createSupabaseClient(req: Request): SupabaseClient {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables: SUPABASE_URL or SUPABASE_ANON_KEY');
    }

    const token = req.headers.authorization?.replace('Bearer ', ''); 

    if (!token) {
        throw new Error('Unauthorized: token not provided in authorization header.');
    }

    return createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            headers: {
                "Authorization": `Bearer ${token}`, 
            }
        }
    });
}