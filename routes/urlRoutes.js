const express = require('express');
const { createShortUrl, redirectToOriginalUrl } = require('../controllers/urlController');

const router = express.Router();

// This router for creating short url
router.post('/shorten', createShortUrl);


// this router for getting original url from short url
router.get('/:shortUrl', redirectToOriginalUrl);

module.exports = router;
