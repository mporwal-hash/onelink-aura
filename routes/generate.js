const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const urlMappings = require('./urlMappings'); // Import your mapping


router.post('/', (req, res) => {
  const { brand, androidPackage, iosAppStoreId, fallbackUrl } = req.body;

  if (!brand || !androidPackage || !iosAppStoreId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const payload = {
    brand,
    androidPackage,
    iosAppStoreId,
    fallbackUrl: fallbackUrl || 'https://aura.services'
  };

  // generate short id
  const shortId = nanoid(6);

  // short URL path: /brand/shortId
  const shortLink = `${req.protocol}://${req.get('host')}/${shortId}`;

  // Save mapping for redirect
  urlMappings[shortId] = payload;

  res.json({ shortLink });
});

// Export urlMappings for use in redirect.js
module.exports = router;