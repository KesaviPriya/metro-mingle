// Replace log.php
import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { EMAIL, PASSWORD } = req.body;

    if (!EMAIL || !PASSWORD) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(EMAIL)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: EMAIL,
      password: PASSWORD
    });

    if (error) {
      console.error('Login error:', error);
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
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}
