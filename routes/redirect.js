const express = require('express');
const router = express.Router();
const urlMappings = require('./urlMappings');

router.get('/:shortId', (req, res) => {
  console.log('Redirect request for:', req.params);
  const key = req.params.shortId;
  const payload = urlMappings[key];

  if (!payload) {
    return res.status(404).send('Short URL not found');
  }

  const userAgent = req.headers['user-agent'] || '';
  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

  let redirectUrl;
  if (isAndroid) {
    redirectUrl = `https://play.google.com/store/apps/details?id=${payload.androidPackage}`;
  } else if (isIOS) {
    redirectUrl = `https://apps.apple.com/app/id${payload.iosAppStoreId}`;
  } else {
    redirectUrl = payload.fallbackUrl;
  }

  res.redirect(302, redirectUrl);
});

module.exports = router;