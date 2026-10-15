const { pool } = require('../config/db');

exports.getAllProjects = async (req, res) => {
  try {
    const { status, search } = req.query;
    let sql = 'SELECT * FROM Gen_Projects WHERE deleted_int = 0';
    const params = [];

    if (status && status !== 'All') {
      sql += ' AND status_vc = ?';
      params.push(status);
    }

    if (search) {
      sql += ' AND (projectname_vc LIKE ? OR clientname_vc LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY projectcode_int DESC;';

    const [rows] = await pool.query(sql, params);
    return res.json({ success: true, count: rows.length, projects: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Gen_Projects WHERE projectcode_int = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }
    return res.json({ success: true, project: rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createProject = async (req, res) => {
  const { projectname_vc, clientname_vc, startdate_dt, enddate_dt, status_vc = 'Active' } = req.body;
  if (!projectname_vc) {
    return res.status(400).json({ success: false, message: 'Project name is required.' });
  }

  try {
    const crby = req.user ? req.user.username_vc : 'System Admin';
    const [result] = await pool.query(
      `INSERT INTO Gen_Projects (projectname_vc, clientname_vc, startdate_dt, enddate_dt, status_vc, crby_vc)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [projectname_vc, clientname_vc, startdate_dt, enddate_dt, status_vc, crby]
    );

    return res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      projectcode_int: result.insertId,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { projectname_vc, clientname_vc, startdate_dt, enddate_dt, status_vc } = req.body;

  try {
    const modby = req.user ? req.user.username_vc : 'System Admin';
    await pool.query(
      `UPDATE Gen_Projects
       SET projectname_vc = COALESCE(?, projectname_vc),
           clientname_vc = COALESCE(?, clientname_vc),
           startdate_dt = COALESCE(?, startdate_dt),
           enddate_dt = COALESCE(?, enddate_dt),
           status_vc = COALESCE(?, status_vc),
           modby_vc = ?
       WHERE projectcode_int = ?`,
      [projectname_vc, clientname_vc, startdate_dt, enddate_dt, status_vc, modby, id]
    );

    return res.json({ success: true, message: 'Project updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    // Soft delete
    await pool.query('UPDATE Gen_Projects SET deleted_int = 1 WHERE projectcode_int = ?', [id]);
    return res.json({ success: true, message: 'Project archived successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
