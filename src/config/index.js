module.exports = {
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
  
  idVisorFolder: process.env.VISOR_FOLDER,
  idSliderFolder: process.env.SLIDER_FOLDER,
  idAudioFolder: process.env.AUDIO_FOLDER,
  idVideoFolder: process.env.VIDEO_FOLDER,
  
  mediaClientId: process.env.MEDIA_CLIENT_ID,
  mediaClientSecret: process.env.MEDIA_CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
  accessToken: process.env.ACCESS_TOKEN,
  redirectUri: process.env.REDIRECT_URI,
  
  authClientId: process.env.AUTH_CLIENT_ID,
  authClientSecret: process.env.AUTH_CLIENT_SECRET,
  authClientUrl: process.env.AUTH_CLIENT_URL,
  
  sendgridApi: process.env.SENDGRID_API,
  sendgridSecret: process.env.SENDGRID_SECRET,
  
  aliasTest: process.env.ALIAS_TEST,
  emailTest: process.env.EMAIL_TEST, 
  passwordTest: process.env.PASSWORD_TEST, 
  
  postgreString: process.env.POSTGRES_STRING,
}