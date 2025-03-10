/**
 * Test Analytics API Endpoint
 *
 * This is a simplified endpoint that simulates success without writing to Firebase.
 * Use this for testing the analytics flow.
 */

// API key for authentication
const API_KEY = process.env.ANALYTICS_API_KEY || 'class-action-analytics-key';

module.exports = async (req, res) => {
  console.log('🔍 [Analytics Test] Received request:', {
    method: req.method,
    url: req.url,
    headers: {
      'content-type': req.headers['content-type'],
      'x-api-key': req.headers['x-api-key'] ? '***' : 'not provided', // Mascherato per sicurezza
      'user-agent': req.headers['user-agent'],
      origin: req.headers['origin'],
    },
  });

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    console.log('🔍 [Analytics Test] Handling OPTIONS request (CORS preflight)');
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log(`🔍 [Analytics Test] Method not allowed: ${req.method}`);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify API key
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    console.error('🔍 [Analytics Test] Invalid API key provided');
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // Get events from request body
    const events = Array.isArray(req.body) ? req.body : [req.body];

    if (events.length === 0) {
      console.log('🔍 [Analytics Test] No events provided in request body');
      return res.status(400).json({ error: 'No events provided' });
    }

    // Log events (but don't store them)
    console.log('🔍 [Analytics Test] Received events:', JSON.stringify(events, null, 2));

    // Log event details for easier analysis
    events.forEach((event, index) => {
      console.log(`🔍 [Analytics Test] Event ${index + 1}:`, {
        eventName: event.eventName,
        timestamp: new Date(event.timestamp).toISOString(),
        sessionId: event.sessionId,
        pluginVersion: event.pluginVersion,
        dataKeys: event.eventData ? Object.keys(event.eventData) : 'none',
      });
    });

    // Return success response
    console.log(`🔍 [Analytics Test] Successfully processed ${events.length} events`);
    return res.status(200).json({
      success: true,
      message: `Successfully received ${events.length} events (test mode)`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Log error
    console.error('🔍 [Analytics Test] Error processing analytics data:', error);

    // Return error response
    return res.status(500).json({
      error: 'Failed to process analytics data',
      message: error.message,
    });
  }
};
