module.exports = {
  port: process.env.PORT,
  postgreString: process.env.POSTGRES_STRING,
  
  visorFolder: process.env.VISOR_FOLDER,
  sliderFolder: process.env.SLIDER_FOLDER,
  
  sendgridApi: process.env.SENDGRID_API,
  sendgridSecret: process.env.SENDGRID_SECRET,

  aliasTest: process.env.ALIAS_TEST,
  emailTest: process.env.EMAIL_TEST, 
  passwordTest: process.env.PASSWORD_TEST, 
  
}