const { pool } = require('../config/db');

exports.getSalaryMaster = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT sm.*, e.empname_vc, e.email_vc, j.jtitle_vc, c.cname_vc
      FROM emp_salary_master sm
      JOIN Gen_Employee e ON sm.ecode_nu = e.ecode_nu
      LEFT JOIN Gen_JobTitles j ON e.jcode_int = j.jcode_int
      LEFT JOIN Gen_Company c ON e.ccode_int = c.ccode_int
      ORDER BY sm.salaryyear_int DESC, sm.salarymonth_int DESC, sm.salarymaster_id DESC
    `);
    return res.json({ success: true, count: rows.length, salaries: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllowances = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Gen_Allowance_List WHERE deleted_int = 0 ORDER BY allowancecode_int ASC');
    return res.json({ success: true, count: rows.length, allowances: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createAllowance = async (req, res) => {
  const { allowancename_vc, allowanceamount_dc } = req.body;
  if (!allowancename_vc || allowanceamount_dc === undefined) {
    return res.status(400).json({ success: false, message: 'Allowance name and amount are required.' });
  }

  try {
    const crby = req.user ? req.user.username_vc : 'System Admin';
    const [result] = await pool.query(
      `INSERT INTO Gen_Allowance_List (allowancename_vc, allowanceamount_dc, crby_vc) VALUES (?, ?, ?)`,
      [allowancename_vc, allowanceamount_dc, crby]
    );

    return res.status(201).json({
      success: true,
      message: 'Allowance created successfully.',
      allowancecode_int: result.insertId,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getDeductions = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Gen_Deductions_List WHERE deleted_int = 0 ORDER BY deductioncode_int ASC');
    return res.json({ success: true, count: rows.length, deductions: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createDeduction = async (req, res) => {
  const { deductionname_vc, deductionamount_dc } = req.body;
  if (!deductionname_vc || deductionamount_dc === undefined) {
    return res.status(400).json({ success: false, message: 'Deduction name and amount are required.' });
  }

  try {
    const crby = req.user ? req.user.username_vc : 'System Admin';
    const [result] = await pool.query(
      `INSERT INTO Gen_Deductions_List (deductionname_vc, deductionamount_dc, crby_vc) VALUES (?, ?, ?)`,
      [deductionname_vc, deductionamount_dc, crby]
    );

    return res.status(201).json({
      success: true,
      message: 'Deduction created successfully.',
      deductioncode_int: result.insertId,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
