// Simple event booking without Supabase - no rate limits
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
    const eventData = {
      id: Date.now().toString(),
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

    // Log to console for testing (in production, you'd save to database)
    console.log('Event booking submission:', eventData);

    return res.status(200).json({ 
      success: true, 
      message: 'Booking saved successfully!',
      data: eventData
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
