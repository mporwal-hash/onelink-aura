const express = require('express');
const router = express.Router();

router.get('/:code', (req, res) => {
  try {
    const code = req.params.code;
    const decoded = JSON.parse(Buffer.from(code, 'base64url').toString());

    const userAgent = req.headers['user-agent'] || '';
    const isAndroid = /Android/i.test(userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

    let redirectUrl;

    if (isAndroid) {
      redirectUrl = `https://play.google.com/store/apps/details?id=${decoded.androidPackage}`;
    } else if (isIOS) {
      redirectUrl = `https://apps.apple.com/app/id${decoded.iosAppStoreId}`;
    } else {
      redirectUrl = decoded.fallbackUrl;
    }

    res.redirect(302, redirectUrl);
  } catch (err) {
    res.status(400).send('Invalid short link');
  }
});

module.exports = router;
