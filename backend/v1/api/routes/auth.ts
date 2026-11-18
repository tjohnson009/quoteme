import express from 'express';
import { supabase, supabaseAdmin } from '../../../supabaseclient';
import { sampleQuotes } from '../demo/sampleQuotes';
import { deleteOldDemoAccounts } from '../demo/deleteOldDemoAccounts';

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
  res.status(200).json({ user: data.user, session: data.session });
  return; 
});

router.post('/demo', async (req, res) => {
  // make a temporary account with no email or password
  const { data, error } = await supabase.auth.signInAnonymously();

  if (error) {
    // supabase allows 30 demo sign ins per hour
    if (error.status === 429) {
      res.status(429).json({ error: 'Lots of people are trying the demo right now. Try again in a few minutes.' });
      return;
    }
    res.status(400).json({ error: error.message });
    return;
  }

  if (!data.session || !data.user) {
    res.status(400).json({ error: 'Could not start the demo.' });
    return;
  }

  // give the new account its own copy of the sample quotes
  const userID = data.user.id;
  const { error: insertError } = await supabaseAdmin
    .from('saved_quotes')
    .insert(sampleQuotes.map(quote => ({ ...quote, user_id: userID })));

  if (insertError) {
    console.error('Error adding sample quotes:', insertError);
    res.status(500).json({ error: 'Could not load the sample quotes. Please try again.' });
    return;
  }

  res.status(200).json({ session: data.session, user: data.user });

  // clean up demo accounts older than 24 hours (after answering, so the visitor doesn't wait)
  await deleteOldDemoAccounts();
});

export default router;
