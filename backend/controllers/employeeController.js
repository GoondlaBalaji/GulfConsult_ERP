const { pool } = require('../config/db');

exports.getAllEmployees = async (req, res) => {
  try {
    const { department, status, search } = req.query;
    let sql = `
      SELECT e.ecode_nu, e.empname_vc, e.gender_vc, e.dob_dt, e.mobile_vc, e.email_vc,
             e.address_vc, e.doj_dt, e.status_vc,
             j.jcode_int, j.jtitle_vc,
             c.ccode_int, c.cname_vc,
             n.ncode_int, n.nname_vc AS nationality,
             ed.ecode_int, ed.education_vc
      FROM Gen_Employee e
      LEFT JOIN Gen_JobTitles j ON e.jcode_int = j.jcode_int
      LEFT JOIN Gen_Company c ON e.ccode_int = c.ccode_int
      LEFT JOIN gen_nationality n ON e.ncode_int = n.ncode_int
      LEFT JOIN Gen_Education ed ON e.ecode_int = ed.ecode_int
      WHERE 1=1
    `;
    const params = [];

    if (status && status !== 'All Status') {
      sql += ' AND e.status_vc = ?';
      params.push(status);
    }

    if (search) {
      sql += ' AND (e.empname_vc LIKE ? OR e.email_vc LIKE ? OR j.jtitle_vc LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY e.ecode_nu ASC;';

    const [rows] = await pool.query(sql, params);
    return res.json({ success: true, count: rows.length, employees: rows });
  } catch (err) {
    console.error('Error fetching employees:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT e.*, j.jtitle_vc, c.cname_vc, n.nname_vc AS nationality, ed.education_vc
       FROM Gen_Employee e
       LEFT JOIN Gen_JobTitles j ON e.jcode_int = j.jcode_int
       LEFT JOIN Gen_Company c ON e.ccode_int = c.ccode_int
       LEFT JOIN gen_nationality n ON e.ncode_int = n.ncode_int
       LEFT JOIN Gen_Education ed ON e.ecode_int = ed.ecode_int
       WHERE e.ecode_nu = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Employee not found.' });
    }

    return res.json({ success: true, employee: rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createEmployee = async (req, res) => {
  const {
    ccode_int = 1,
    empname_vc,
    gender_vc = 'Male',
    dob_dt,
    mobile_vc,
    email_vc,
    address_vc,
    jcode_int = 1,
    ncode_int = 1,
    ecode_int = 1,
    doj_dt,
    status_vc = 'Active',
  } = req.body;

  if (!empname_vc || !email_vc) {
    return res.status(400).json({ success: false, message: 'Employee name and email are required.' });
  }

  const cleanEmail = email_vc.trim().toLowerCase();

  try {
    // Prevent duplicate employees with the same email
    const [existing] = await pool.query(
      'SELECT ecode_nu, empname_vc FROM Gen_Employee WHERE LOWER(email_vc) = ?',
      [cleanEmail]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `An employee (${existing[0].empname_vc}) is already registered with this email address (${cleanEmail}). Each employee must have a unique email address.`,
      });
    }

    const crby = req.user ? req.user.username_vc : 'System Admin';
    const [result] = await pool.query(
      `INSERT INTO Gen_Employee 
       (ccode_int, empname_vc, gender_vc, dob_dt, mobile_vc, email_vc, address_vc, jcode_int, ncode_int, ecode_int, doj_dt, status_vc, crby_vc)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ccode_int,
        empname_vc,
        gender_vc,
        dob_dt || '1995-01-01',
        mobile_vc,
        cleanEmail,
        address_vc,
        jcode_int,
        ncode_int,
        ecode_int,
        doj_dt || new Date().toISOString().split('T')[0],
        status_vc,
        crby,
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Employee created successfully.',
      ecode_nu: result.insertId,
    });
  } catch (err) {
    console.error('Error creating employee:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'An employee with this email address already exists. Duplicate email is not allowed.',
      });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { empname_vc, mobile_vc, email_vc, address_vc, jcode_int, status_vc } = req.body;

  try {
    // If updating email, ensure no other employee has the same email
    if (email_vc) {
      const cleanEmail = email_vc.trim().toLowerCase();
      const [existing] = await pool.query(
        'SELECT ecode_nu, empname_vc FROM Gen_Employee WHERE LOWER(email_vc) = ? AND ecode_nu != ?',
        [cleanEmail, id]
      );
      if (existing.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Another employee (${existing[0].empname_vc}) is already using this email address (${cleanEmail}).`,
        });
      }
    }

    const modby = req.user ? req.user.username_vc : 'System Admin';
    await pool.query(
      `UPDATE Gen_Employee 
       SET empname_vc = COALESCE(?, empname_vc),
           mobile_vc = COALESCE(?, mobile_vc),
           email_vc = COALESCE(?, email_vc),
           address_vc = COALESCE(?, address_vc),
           jcode_int = COALESCE(?, jcode_int),
           status_vc = COALESCE(?, status_vc),
           modby_vc = ?
       WHERE ecode_nu = ?`,
      [empname_vc, mobile_vc, email_vc ? email_vc.trim().toLowerCase() : undefined, address_vc, jcode_int, status_vc, modby, id]
    );

    return res.json({ success: true, message: 'Employee updated successfully.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'An employee with this email address already exists. Duplicate email is not allowed.',
      });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM Gen_Employee WHERE ecode_nu = ?`, [id]);
    return res.json({ success: true, message: 'Employee deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getEmployeeMetrics = async (req, res) => {
  try {
    const [[{ totalEmployees }]] = await pool.query('SELECT COUNT(*) AS totalEmployees FROM Gen_Employee;');
    const [[{ activeEmployees }]] = await pool.query("SELECT COUNT(*) AS activeEmployees FROM Gen_Employee WHERE status_vc = 'Active';");
    const [[{ totalCompanies }]] = await pool.query('SELECT COUNT(*) AS totalCompanies FROM Gen_Company;');
    const [[{ newJoiners }]] = await pool.query("SELECT COUNT(*) AS newJoiners FROM New_Joiner_List;");

    return res.json({
      success: true,
      metrics: {
        totalEmployees: totalEmployees || 0,
        activeEmployees: activeEmployees || 0,
        departments: totalCompanies || 0,
        newJoiners: newJoiners || 0,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
