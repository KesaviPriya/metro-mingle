// Updated with Supabase database integration
import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const contactData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.number,
      subject: req.body.subject,
      message: req.body.message,
      created_at: new Date().toISOString()
    };

    // Save to Supabase database
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([contactData])
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to send message' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!',
      data: data[0]
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
