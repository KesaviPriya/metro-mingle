// Simple login without Supabase - for testing/development only
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

    // For testing: Accept any valid email/password combination
    // In production, you would verify against a database
    const mockUser = {
      id: Date.now().toString(),
      email: EMAIL,
      name: EMAIL.split('@')[0],
      created_at: new Date().toISOString()
    };

    const mockSession = {
      access_token: 'mock_token_' + Date.now(),
      expires_at: Date.now() + (3600 * 1000), // 1 hour
      user: mockUser
    };

    return res.status(200).json({ 
      success: true, 
      message: 'Login successful!',
      user: mockUser,
      session: mockSession
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}
