const express = require('express');
const router = express.Router();

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

  // encode payload to URL-safe base64
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');

  // generate shortlink path
  const shortLink = `${req.protocol}://${req.get('host')}/r/${encoded}`;

  res.json({ shortLink });
});

module.exports = router;
