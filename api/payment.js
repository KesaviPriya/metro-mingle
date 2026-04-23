// Updated with Supabase database integration
import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const paymentData = {
      full_name: req.body.full_name,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code,
      event: req.body.event,
      card_name: req.body.card_name,
      card_last4: req.body.card_number?.slice(-4), // Only store last 4 digits
      exp_month: req.body.exp_month,
      exp_year: req.body.exp_year,
      created_at: new Date().toISOString()
    };

    // Save to Supabase database
    const { data, error } = await supabase
      .from('payments')
      .insert([paymentData])
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Payment processing failed' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Payment processed successfully!',
      data: data[0]
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
