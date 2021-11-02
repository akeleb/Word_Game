const mySql = require("mysql");

var connection = mySql.createConnection({
 host: "localhost",
 user: process.env.USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
 dialect: "mysql",
});

connection.connect(function (err) {
 if (err) {
  console.error("error connecting database: " + err);
  return;
 }

 console.log("Database connected ");
});

module.exports = connection;