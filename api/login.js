// Replace log.php
import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { EMAIL, PASSWORD } = req.body;

    if (!EMAIL || !PASSWORD) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: EMAIL,
      password: PASSWORD
    });

    if (error) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Login successful!',
      user: data.user,
      session: data.session
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
