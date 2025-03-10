/**
 * Public Analytics API Endpoint
 *
 * This is a serverless function to collect anonymous usage data
 * from the Class Action Figma plugin and store it in Firebase.
 * This endpoint is configured to bypass Vercel authentication.
 */

const admin = require('firebase-admin');

// API key for authentication
const API_KEY = process.env.ANALYTICS_API_KEY || 'class-action-analytics-key';

// Initialize Firebase
let serviceAccount;

try {
  console.log('🔥 [Analytics] Initializing Firebase...');

  // In production, use environment variables
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    console.log('🔥 [Analytics] Using Firebase service account from environment variables');
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    // In development, use local file (don't commit this file!)
    console.log('🔥 [Analytics] Using Firebase service account from local file');
    serviceAccount = require('../firebase-service-account.json');
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('🔥 [Analytics] Firebase initialized successfully');
  }
} catch (error) {
  console.error('🔥 [Analytics] Firebase initialization error:', error);
}

// Get Firestore database
const db = admin.apps.length ? admin.firestore() : null;

module.exports = async (req, res) => {
  console.log('🔥 [Analytics] Received request:', {
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
    console.log('🔥 [Analytics] Handling OPTIONS request (CORS preflight)');
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log(`🔥 [Analytics] Method not allowed: ${req.method}`);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify API key
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    console.error('🔥 [Analytics] Invalid API key provided');
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // Check if database is initialized
    if (!db) {
      console.error('🔥 [Analytics] Database not initialized');
      throw new Error('Database not initialized');
    }

    // Get events from request body
    const events = Array.isArray(req.body) ? req.body : [req.body];

    if (events.length === 0) {
      console.log('🔥 [Analytics] No events provided in request body');
      return res.status(400).json({ error: 'No events provided' });
    }

    console.log('🔥 [Analytics] Received events:', JSON.stringify(events, null, 2));

    // Log event details for easier analysis
    events.forEach((event, index) => {
      console.log(`🔥 [Analytics] Event ${index + 1}:`, {
        eventName: event.eventName,
        timestamp: new Date(event.timestamp).toISOString(),
        sessionId: event.sessionId,
        pluginVersion: event.pluginVersion,
        dataKeys: event.eventData ? Object.keys(event.eventData) : 'none',
      });
    });

    // Batch write to Firestore
    console.log('🔥 [Analytics] Creating batch write to Firestore...');
    const batch = db.batch();
    const analyticsCollection = db.collection('analytics');

    // Process each event
    events.forEach((event) => {
      // Add timestamp for when the event was received by the server
      const enrichedEvent = {
        ...event,
        receivedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      // Create a new document with auto-generated ID
      const docRef = analyticsCollection.doc();
      batch.set(docRef, enrichedEvent);
      console.log(`🔥 [Analytics] Added event to batch: ${event.eventName} (doc ID: ${docRef.id})`);
    });

    // Commit the batch
    console.log('🔥 [Analytics] Committing batch to Firestore...');
    await batch.commit();

    // Log success
    console.log(`🔥 [Analytics] Successfully stored ${events.length} events in Firestore`);

    // Return success response
    return res.status(200).json({
      success: true,
      message: `Successfully stored ${events.length} events`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Log error
    console.error('🔥 [Analytics] Error storing analytics data:', error);

    // Return error response
    return res.status(500).json({
      error: 'Failed to store analytics data',
      message: error.message,
    });
  }
};
