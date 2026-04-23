// Simple contact form without Supabase - no rate limits
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
    const contactData = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.number,
      subject: req.body.subject,
      message: req.body.message,
      created_at: new Date().toISOString()
    };

    // Log to console for testing (in production, you'd save to database)
    console.log('Contact form submission:', contactData);

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!',
      data: contactData
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
