// Updated with Supabase database integration
import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const eventData = {
      user_name: req.body['user-name'],
      email: req.body.email,
      area: req.body.area,
      event_date: req.body.dob,
      event_time: req.body.time,
      budget: req.body.budget,
      event_type: req.body.event,
      addons: req.body.addons,
      created_at: new Date().toISOString()
    };

    // Save to Supabase database
    const { data, error } = await supabase
      .from('event_bookings')
      .insert([eventData])
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to save booking' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Booking saved successfully!',
      data: data[0]
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
