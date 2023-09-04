require("dotenv").config();
const server = require('./app');
const { port } = require("./config");
const { sequelize } = require("./db.js");

async function main() {
  try {
    await sequelize.sync({force: true});
    console.log("succesfully connected");
    server.listen(port, ()=> console.log(`server listening on port ${port}`))
  } catch (error) {
    server.listen(port, ()=> console.log(`server listening on port ${port}`))
    console.error("Unable to connect to database");
  }
}

main();