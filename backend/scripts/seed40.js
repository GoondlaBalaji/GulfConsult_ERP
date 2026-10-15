const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const runSeed40 = async () => {
  console.log('🔄 Seeding 40-Employee Dataset into GC_ERP...');
  console.log(`📡 Target Host: ${process.env.DB_HOST}:${process.env.DB_PORT || 4000}`);

  const isCloud = process.env.DB_HOST && process.env.DB_HOST !== 'localhost' && process.env.DB_HOST !== '127.0.0.1';
  const sslConfig = (process.env.DB_SSL === 'true' || isCloud) ? { minVersion: 'TLSv1.2', rejectUnauthorized: true } : undefined;

  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'GC_ERP',
      multipleStatements: true,
      ssl: sslConfig,
    });

    console.log('✅ Connected to GC_ERP database.');

    const filePath = path.join(__dirname, '..', '..', 'SQL Scripts', 'Seed_40_Employees.sql');
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const sql = fs.readFileSync(filePath, 'utf-8');
    await connection.query(sql);

    const [[{ totalEmps }]] = await connection.query('SELECT COUNT(*) AS totalEmps FROM Gen_Employee;');
    const [[{ totalUsers }]] = await connection.query('SELECT COUNT(*) AS totalUsers FROM Sec_Users;');
    const [[{ totalSalaries }]] = await connection.query('SELECT COUNT(*) AS totalSalaries FROM emp_salary_master;');

    console.log('\n📊 Seeding Complete!');
    console.log(`   👥 Total Employees in Database: ${totalEmps}`);
    console.log(`   🔐 Total Login Accounts:       ${totalUsers}`);
    console.log(`   💰 Total Payroll Records:       ${totalSalaries}`);
    return true;
  } catch (err) {
    console.error('❌ Seeding Error:', err.message);
    return false;
  } finally {
    if (connection) await connection.end();
  }
};

if (require.main === module) {
  runSeed40();
}

module.exports = { runSeed40 };
