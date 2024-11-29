const { Url } = require('../models');
const { nanoid } = require('nanoid-cjs'); // For generating a unique short code

// This function creates a short url for a new url , but if shortUrl of new url 
// already present in the database then it will give the same shortUrl  
exports.createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({
      error: 'Original URL is required'
    });
  }

  // This code checks that short url of url is already present in database or not
  const url = await Url.findOne({ where: { originalUrl } });

  if (originalUrl == url.originalUrl) {
    res.status(201).json({
      message: 'Short URL created successfully',
      shortUrl: url.shortUrl,
    })
  }

  else {
    try {
      // Generates a unique short code
      const shortUrl = nanoid(6);

      // Save to database
      const newUrl = await Url.create({ originalUrl, shortUrl });
      const liveDomain = 'http://localhost:3001';

      res.status(201).json({
        message: 'Short URL created successfully',
        shortUrl: `${liveDomain}/${newUrl.shortUrl}`,
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

// This function returns the original website url in json format
exports.redirectToOriginalUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    if (!shortUrl) {
      return res.status(400).json({
        err: "Enter a url"
      })
    }

    const url = await Url.findOne({ where: { shortUrl } });

    if (!url) {
      return res.status(404).json({
        error: 'URL not found'
      });
    }

    res.status(201).json({
      message: "Original url of the website",
      originalUrl: url.originalUrl,
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};