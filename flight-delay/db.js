const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "34.172.145.168",
  user: "root",
  password: "123456",
  database: "PT1_flights_delay",
});
// 测试查询
connection.query('SELECT 1', (err, results) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Database connection successful:', results);
  }
});
module.exports = connection;
