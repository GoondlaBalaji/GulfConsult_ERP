const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const runInit = async () => {
  console.log('🔄 Initializing Gulf Consult ERP Database (GC_ERP)...');
  console.log(`📡 Connecting to MySQL at ${process.env.DB_HOST}:${process.env.DB_PORT} as ${process.env.DB_USER}...`);

  let connection;
  try {
    // Connect without database first to ensure database creation
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true,
    });

    console.log('✅ MySQL Server connection established.');

    // Create database if not exists
    const dbName = process.env.DB_NAME || 'GC_ERP';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.query(`USE \`${dbName}\`;`);
    console.log(`✅ Using database "${dbName}".`);

    const sqlScriptsDir = path.join(__dirname, '..', '..', 'SQL Scripts');
    const scripts = ['HRMS.sql', 'TSMS.sql', 'Payroll.sql', 'Seed_Data.sql'];

    for (const scriptName of scripts) {
      const filePath = path.join(sqlScriptsDir, scriptName);
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Script file not found: ${filePath}`);
        continue;
      }

      console.log(`\n📄 Executing ${scriptName}...`);
      const sql = fs.readFileSync(filePath, 'utf-8');
      
      // Execute multi-statement SQL
      await connection.query(sql);
      console.log(`✅ Successfully executed ${scriptName}`);
    }

    // Inspect created tables
    const [tables] = await connection.query('SHOW TABLES;');
    console.log('\n📊 Created Tables in GC_ERP:');
    tables.forEach((row, idx) => {
      const tableName = Object.values(row)[0];
      console.log(`   ${idx + 1}. ${tableName}`);
    });

    console.log('\n🎉 Database initialization finished successfully!');
  } catch (err) {
    console.error('\n❌ Initialization Error:', err.message);
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('👉 Please verify your DB_PASSWORD in backend/.env');
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

runInit();
