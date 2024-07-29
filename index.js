const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/instagram-feed', async (req, res) => {
    try {
        const token = process.env.INSTAGRAM_ACCESS_TOKEN;
        const response = await axios.get(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Instagram feed' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
