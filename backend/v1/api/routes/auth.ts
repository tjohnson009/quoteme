// this file handles user authentication routes for login and signup using Supabase 
import express from 'express';
import { supabase } from '../../../supabaseclient';

const router = express.Router();
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(200).json({ session: data.session, user: data.user });
    return; 
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    res.status(400).json({ error: error.message });
    return; 
  }
  res.status(200).json({ user: data.user });
  return; 
});

export default router;
