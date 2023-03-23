const mysql = require('mysql2');

// create connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Faith1234',
  database: 'classwork_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// execute a query
pool.query('SELECT * FROM sailors', (err, results, fields) => {
  if (err) throw err;
  console.log(results);
});

// close the connection pool
pool.end((err) => {
  if (err) throw err;
  console.log('Connection pool closed.');
});
