// Replace SIGNUP.php
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
    const { name, EMAIL, PASSWORD, phoneno } = req.body;

    // Validate input
    if (!name || !EMAIL || !PASSWORD || !phoneno) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(EMAIL)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    // Validate password length (Supabase requires minimum 6 characters)
    if (PASSWORD.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Validate phone number
    if (phoneno.length < 10) {
      return res.status(400).json({ error: 'Please enter a valid phone number' });
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: EMAIL,
      password: PASSWORD,
      options: {
        data: {
          name: name,
          phone: phoneno
        }
      }
    });

    if (authError) {
      console.error('Supabase auth error:', authError);
      return res.status(400).json({ error: authError.message || 'Failed to create account' });
    }

    // Store additional user data in database (optional - may fail if table doesn't exist)
    if (authData.user) {
      const { error: dbError } = await supabase
        .from('users')
        .insert([
          { 
            id: authData.user.id,
            name: name,
            email: EMAIL,
            phone: phoneno,
            created_at: new Date().toISOString()
          }
        ]);

      if (dbError) {
        console.error('Database error (non-critical):', dbError);
        // Don't fail signup if table doesn't exist
      }
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Account created successfully!',
      user: authData.user
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}
