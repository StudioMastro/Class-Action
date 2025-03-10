/**
 * Test endpoint for the analytics API
 *
 * This is a simple endpoint to test if the API is working correctly.
 */

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Return a success response
  return res.status(200).json({
    success: true,
    message: 'Analytics API is working correctly',
    timestamp: new Date().toISOString(),
  });
};
