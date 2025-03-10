/**
 * Analytics API Endpoint
 *
 * This is a serverless function to collect anonymous usage data
 * from the Class Action Figma plugin and store it in Firebase.
 *
 * Deploy this to Vercel or similar serverless platform.
 */

const admin = require('firebase-admin');

// API key for authentication
const API_KEY = process.env.ANALYTICS_API_KEY || 'class-action-analytics-key';

// Initialize Firebase
let serviceAccount;

try {
  // In production, use environment variables
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    // In development, use local file (don't commit this file!)
    serviceAccount = require('../firebase-service-account.json');
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
}

// Get Firestore database
const db = admin.apps.length ? admin.firestore() : null;

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify API key
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    console.error('Invalid API key:', apiKey);
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // Check if database is initialized
    if (!db) {
      throw new Error('Database not initialized');
    }

    // Get events from request body
    const events = Array.isArray(req.body) ? req.body : [req.body];

    if (events.length === 0) {
      return res.status(400).json({ error: 'No events provided' });
    }

    // Batch write to Firestore
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
    });

    // Commit the batch
    await batch.commit();

    // Log success
    console.log(`Successfully stored ${events.length} events`);

    // Return success response
    return res.status(200).json({
      success: true,
      message: `Successfully stored ${events.length} events`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Log error
    console.error('Error storing analytics data:', error);

    // Return error response
    return res.status(500).json({
      error: 'Failed to store analytics data',
      message: error.message,
    });
  }
};
