const { pool } = require('../config/db');

exports.getCompanies = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Gen_Company ORDER BY ccode_int ASC');
    return res.json({ success: true, count: rows.length, companies: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getJobTitles = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Gen_JobTitles WHERE deleted_int = 0 ORDER BY jcode_int ASC');
    return res.json({ success: true, count: rows.length, jobTitles: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getNationalities = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM gen_nationality WHERE deleted_int = 0 ORDER BY nname_vc ASC');
    return res.json({ success: true, count: rows.length, nationalities: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getEducations = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Gen_Education WHERE deleted_int = 0 ORDER BY ecode_int ASC');
    return res.json({ success: true, count: rows.length, educations: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getDocTypes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Gen_DocTypes WHERE deleted_int = 0 ORDER BY doctypecode_int ASC');
    return res.json({ success: true, count: rows.length, docTypes: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getLeaveTypes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Gen_LeaveTypes WHERE deleted_int = 0 ORDER BY leavecode_int ASC');
    return res.json({ success: true, count: rows.length, leaveTypes: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getJobOpenings = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT jo.*, j.jtitle_vc, c.cname_vc
      FROM Jobopening_List jo
      JOIN Gen_JobTitles j ON jo.jcode_int = j.jcode_int
      JOIN Gen_Company c ON jo.ccode_int = c.ccode_int
      ORDER BY jo.jobopen_id DESC
    `);
    return res.json({ success: true, count: rows.length, jobOpenings: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getNewJoiners = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT nj.*, j.jtitle_vc
      FROM New_Joiner_List nj
      LEFT JOIN Gen_JobTitles j ON nj.jcode_int = j.jcode_int
      ORDER BY nj.joiner_id DESC
    `);
    return res.json({ success: true, count: rows.length, newJoiners: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const [[{ totalEmployees }]] = await pool.query('SELECT COUNT(*) AS totalEmployees FROM Gen_Employee;');
    const [[{ activeProjects }]] = await pool.query("SELECT COUNT(*) AS activeProjects FROM Gen_Projects WHERE deleted_int = 0;");
    const [[{ totalUsers }]] = await pool.query('SELECT COUNT(*) AS totalUsers FROM Sec_Users;');
    const [[{ newJoinersCount }]] = await pool.query('SELECT COUNT(*) AS newJoinersCount FROM New_Joiner_List;');

    return res.json({
      success: true,
      stats: {
        totalEmployees: totalEmployees || 0,
        activeProjects: activeProjects || 0,
        totalUsers: totalUsers || 0,
        newJoiners: newJoinersCount || 0,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.seed40Employees = async (req, res) => {
  try {
    const { runSeed40 } = require('../scripts/seed40');
    const ok = await runSeed40();
    if (!ok) {
      return res.status(500).json({ success: false, message: 'Failed to run 40-employee seed.' });
    }
    const [[{ totalEmps }]] = await pool.query('SELECT COUNT(*) AS totalEmps FROM Gen_Employee;');
    const [[{ totalUsers }]] = await pool.query('SELECT COUNT(*) AS totalUsers FROM Sec_Users;');
    return res.json({
      success: true,
      message: '40-employee dataset successfully loaded into database!',
      totalEmployees: totalEmps,
      totalUsers: totalUsers,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

