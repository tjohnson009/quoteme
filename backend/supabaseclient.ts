import dotenv from 'dotenv';
dotenv.config(); // loads environment variables from .env file
import { createClient, SupabaseClient } from '@supabase/supabase-js'; 
import { Request } from 'express';

const supabaseUrl = process.env.SUPABASE_URL; 
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
// console.log(supabaseUrl, supabaseAnonKey);

// if (!supabaseUrl || !supabaseAnonKey) {
//     throw new Error('Missing Supabase environment variables: SUPABASE_URL or SUPABASE_ANON_KEY');
// }

function createSupabaseClient(req: Request): SupabaseClient {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables: SUPABASE_URL or SUPABASE_ANON_KEY');
    }

    const token = req.headers.authorization?.replace('Bearer ', ''); 

    if (!token) {
        // res.status(401).json({ error: 'Unauthorized: token not valid.' });
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

// const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//     global: {
//         headers: {
//             "Authorization": `Bearer ${token}`, 
//         }
//     }
// }); 

// export default supabase; 
export default createSupabaseClient; 