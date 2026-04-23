// Simple payment processing without Supabase - no rate limits
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
    const paymentData = {
      id: Date.now().toString(),
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

    // Log to console for testing (in production, you'd save to database)
    console.log('Payment submission:', paymentData);

    return res.status(200).json({ 
      success: true, 
      message: 'Payment processed successfully!',
      data: paymentData
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
