/**
 * Local Test Server for Analytics
 *
 * This is a simple local server to test the analytics flow.
 * Run with: node local-test-server.js
 */

const http = require('http');

// API key for authentication
const API_KEY = 'class-action-analytics-key';

// Create HTTP server
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Only allow POST requests to /analytics
  if (req.method !== 'POST' || req.url !== '/analytics') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  // Verify API key
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    console.error('Invalid API key:', apiKey);
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Authentication required' }));
    return;
  }

  // Get request body
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      // Parse JSON body
      const events = JSON.parse(body);

      // Log events
      console.log('Received events:', JSON.stringify(events, null, 2));

      // Return success response
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          success: true,
          message: `Successfully received ${Array.isArray(events) ? events.length : 1} events`,
          timestamp: new Date().toISOString(),
        }),
      );
    } catch (error) {
      console.error('Error processing request:', error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid request body' }));
    }
  });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}/analytics`);
  console.log(`Send POST requests with X-API-Key: ${API_KEY}`);
});
