
const express = require("express");
const router = express.Router();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: '/app/src/controllers/credentials.json',
  scopes: ['https://www.googleapis.com/auth/youtube.force-ssl']
});

const youtube = google.youtube({
  version: 'v3',
  auth: auth
});

async function checkSubscription(email) {
  try {
    const response = await youtube.subscriptions.list({
      part: 'id,snippet',
      mine: true,
      maxResults: 50
    });
    const subscriptions = await response.data.items;
    console.log(subscriptions)
    const isSubscribed = subscriptions.some(subscription => subscription.snippet.email === email)

    return;
  } catch (error) {
    return error;
  }
}

router.post('/subscription', async (req, res) => {
  try {
    const response = await youtube.channels.list({
      part: 'snippet',
      mine: true
    });
  
    const channel = await response;
    console.log('la response: ', channel.data)
    const channelName = channel.snippet.title;
    console.log(channelName)
  
    return res.status(200).json(channelName);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
