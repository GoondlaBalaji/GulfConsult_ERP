const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const isCloud = process.env.DB_HOST && process.env.DB_HOST !== 'localhost' && process.env.DB_HOST !== '127.0.0.1';
const sslConfig = (process.env.DB_SSL === 'true' || isCloud) ? { minVersion: 'TLSv1.2', rejectUnauthorized: true } : undefined;

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'GC_ERP',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  multipleStatements: true,
  ssl: sslConfig,
});

// Test Database Connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected successfully to MySQL Database:', process.env.DB_NAME || 'GC_ERP');
    connection.release();
    return true;
  } catch (err) {
    console.error('❌ MySQL Connection Failed:');
    console.error('   Host:', process.env.DB_HOST);
    console.error('   User:', process.env.DB_USER);
    console.error('   Error Message:', err.message);
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('   👉 Tip: Please update DB_PASSWORD in backend/.env to match your MySQL root password.');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.error('   👉 Tip: Database does not exist yet. Run "npm run init-db" to create tables.');
    }
    return false;
  }
};

module.exports = {
  pool,
  testConnection,
  query: (sql, params) => pool.execute(sql, params),
};
