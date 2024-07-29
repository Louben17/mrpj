// backend/index.js
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/instagram-feed', async (req, res) => {
    const accessToken = process.env.IG_ACCESS_TOKEN;

    if (!accessToken) {
        return res.status(500).json({ error: 'Instagram access token is not set.' });
    }

    try {
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Instagram feed.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
