const { google } = require("googleapis");
const { refreshToken, mediaClientId, mediaClientSecret, redirectUri } = require("../config");

const oauth2Client = new google.auth.OAuth2(
  mediaClientId,
  mediaClientSecret,
  redirectUri
);

oauth2Client.setCredentials({ refresh_token: refreshToken });

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

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const saveImageToDrive = async (imageBase64, folderId, filename) => {
  const fileMetadata = {
    name: filename,
    parents: [folderId],
  };

  const media = {
    mimeType: 'image/jpeg',
    body: imageBase64,
  };

  try {
    const response = await drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: 'id',
      },
    );
    return response.data.id;
    
  } catch (error) {
    return error;
  };
};

const updateImageInDrive = async (fileId, imageBase64) => {
  try {
    const response = await drive.files.update({
      fileId: fileId,
      media: {
        mimeType: 'image/jpeg',
        body: imageBase64,
      },
    });
    return response.data.id;
  } catch (error) {
    console.error('Error al actualizar el archivo en Google Drive:', error);
    return null;
  }
};

const removeFileFromDrive = async (fileId) => {
  try {
    await drive.files.delete({
      fileId: fileId,
    });
    return;
  } catch (error) {
    console.error('Error al eliminar el archivo de Google Drive:', error);
    return false;
  }
};

module.exports = {
  saveImageToDrive,
  updateImageInDrive,
  removeFileFromDrive
};