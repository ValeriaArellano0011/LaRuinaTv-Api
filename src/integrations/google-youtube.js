const { google } = require("googleapis");
const { ytRefreshToken, ytClientSecret, ytClientId, ytLaruinatvChannel, redirectUri } = require("../config");

const oauth2Client = new google.auth.OAuth2(
  ytClientId,
  ytClientSecret,
  redirectUri
);

oauth2Client.setCredentials({ refresh_token: ytRefreshToken });

async function refreshAccessToken() {
  try {
    const token = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials({ refresh_token: token.credentials.refresh_token });
    return token.credentials.refresh_token
  } catch (error) {
    console.error('Error al actualizar los tokens:', error);
  }
};

setInterval(() => {
  refreshAccessToken();
}, 5000 * 60);

const youtube = google.youtube({
  version: "v3",
  auth: oauth2Client,
});

async function getSubscribers() {
  try {
    const response = await youtube.subscriptions.list({
      part: 'snippet',
      mySubscribers: true,
    });

    const subscribers = response.data;
    return subscribers;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getSubscribers,
}
