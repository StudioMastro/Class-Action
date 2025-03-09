/**
 * Analytics API Endpoint
 *
 * This is a simple serverless function to collect anonymous usage data
 * from the Class Action Figma plugin.
 *
 * Deploy this to Vercel or similar serverless platform.
 */

// For production, you would use a real database
// This is just a simple example that logs to console
// and could be extended to use MongoDB, Firebase, etc.
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the events from the request body
    const { events } = req.body;

    if (!events || !Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ error: 'Invalid events data' });
    }

    // Log the events (in production, you would save to a database)
    console.log(`Received ${events.length} analytics events`);

    // Process each event
    for (const event of events) {
      // Validate event structure
      if (!event.eventName || !event.timestamp || !event.sessionId) {
        console.warn('Invalid event structure:', event);
        continue;
      }

      // In production, you would save to a database here
      // For example with MongoDB:
      // await db.collection('analytics').insertOne(event);

      // For now, just log the event
      console.log(
        `Event: ${event.eventName}, Session: ${event.sessionId}, Time: ${new Date(event.timestamp).toISOString()}`,
      );
    }

    // Return success
    return res.status(200).json({ success: true, count: events.length });
  } catch (error) {
    console.error('Error processing analytics events:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
