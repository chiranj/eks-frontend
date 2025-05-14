const express = require('express');
const axios = require('axios');
const app = express();
const port = 8080;

// Get backend URL from environment variable (will be set from ConfigMap)
const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';

// Serve static files
app.use(express.static('public'));

// API proxy endpoint
app.get('/api/data', async (req, res) => {
  try {
    console.log(`Connecting to backend at: ${backendUrl}`);
    const response = await axios.get(`${backendUrl}/api/messages`);
    res.json({
      backendData: response.data,
      backendUrl: backendUrl
    });
  } catch (error) {
    console.error("Failed to fetch from backend:", error.message);
    res.status(500).json({ 
      error: "Failed to connect to backend service", 
      backendUrl: backendUrl,
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Frontend service running on port ${port}`);
  console.log(`Using backend URL: ${backendUrl}`);
});
