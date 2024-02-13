const mongo = require("mongoose");
// connecting to the database, will create the privateChat Database
mongo
  .connect(process.env.db_connection)
  .then(() => {
    console.log("MongoDB connected to privateChat!");
  })
  .catch((error) => {
    console.log("MongoDB not connected! error: ", error);
  });
module.exports = mongo;