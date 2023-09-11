require("dotenv").config();
const server = require('./app');
const { port } = require("./config");
const { sequelize } = require("./integrations/postgreSQL");

async function main() {
  try {
    await sequelize.sync({force: true});
    console.log("succesfully connected");
    server.listen(port, ()=> console.log(`server listening on port ${port}`))
  } catch (error) {
    console.error("Unable to connect to database");
    server.listen(port, ()=> console.log(`server listening on port ${port}`))
  }
};

main();