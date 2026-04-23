// Simple signup without Supabase - for testing/development only
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

    // Validate password length
    if (PASSWORD.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // For testing: Just return success without actually storing
    // In production, you would store in a database
    const mockUser = {
      id: Date.now().toString(),
      email: EMAIL,
      name: name,
      phone: phoneno,
      created_at: new Date().toISOString()
    };

    return res.status(200).json({ 
      success: true, 
      message: 'Account created successfully!',
      user: mockUser
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}
