// Replace SIGNUP.php
import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, EMAIL, PASSWORD, phoneno } = req.body;

    // Validate input
    if (!name || !EMAIL || !PASSWORD || !phoneno) {
      return res.status(400).json({ error: 'All fields required' });
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
      return res.status(400).json({ error: authError.message });
    }

    // Store additional user data in database
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
      console.error('Database error:', dbError);
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Account created successfully!',
      user: authData.user
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
