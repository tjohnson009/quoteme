import { Request, Response } from 'express';
import { SupabaseClient } from '@supabase/supabase-js'; 
import createSupabaseClient from '../../../supabaseclient.ts'; // Adjust the import path as necessary 

export async function getUserAndClient(req: Request, res: Response): Promise<{ supabase: SupabaseClient; userID: string; }> {

   const supabase = createSupabaseClient(req); // Create a new Supabase client instance 
   const token = req.headers.authorization?.replace('Bearer ', ''); 

   const { data: userData, error: userError } = await supabase.auth.getUser(token); 

    if (!userData || !userData.user) { 
        res.status(401).json({ error: userError || "User not found." });
        return Promise.reject(new Error("User not found.")); 
    }

    return {
        supabase,
        userID: userData.user.id
    };

}
