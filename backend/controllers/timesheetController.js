const { pool } = require('../config/db');

exports.getTimesheets = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT ts.*, e.empname_vc, e.email_vc, j.jtitle_vc
      FROM Emp_Time_Sheet_Details ts
      JOIN Gen_Employee e ON ts.ecode_nu = e.ecode_nu
      LEFT JOIN Gen_JobTitles j ON e.jcode_int = j.jcode_int
      ORDER BY ts.year_int DESC, ts.month_int DESC, ts.timesheet_id DESC
    `);
    return res.json({ success: true, count: rows.length, timesheets: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createTimesheet = async (req, res) => {
  const { ecode_nu, month_int, year_int, totalhours_dc, approvalstatus_vc = 'Pending' } = req.body;
  if (!ecode_nu || !month_int || !year_int) {
    return res.status(400).json({ success: false, message: 'Employee code, month, and year are required.' });
  }

  try {
    const crby = req.user ? req.user.username_vc : 'System Admin';
    const [result] = await pool.query(
      `INSERT INTO Emp_Time_Sheet_Details (ecode_nu, month_int, year_int, totalhours_dc, approvalstatus_vc, crby_vc)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [ecode_nu, month_int, year_int, totalhours_dc || 0, approvalstatus_vc, crby]
    );

    return res.status(201).json({
      success: true,
      message: 'Timesheet submitted successfully.',
      timesheet_id: result.insertId,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getTimeTracks = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT tt.*, e.empname_vc, p.projectname_vc, p.clientname_vc
      FROM Emp_TimeTrack_Details tt
      JOIN Gen_Employee e ON tt.ecode_nu = e.ecode_nu
      JOIN Gen_Projects p ON tt.projectcode_int = p.projectcode_int
      ORDER BY tt.workdate_dt DESC, tt.timetrack_id DESC
    `);
    return res.json({ success: true, count: rows.length, timeTracks: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createTimeTrack = async (req, res) => {
  const { ecode_nu, projectcode_int, workdate_dt, hoursworked_dc, taskdescription_vc, status_vc = 'Logged' } = req.body;
  if (!ecode_nu || !projectcode_int || !workdate_dt || !hoursworked_dc) {
    return res.status(400).json({ success: false, message: 'Employee, project, work date, and hours are required.' });
  }

  try {
    const crby = req.user ? req.user.username_vc : 'System Admin';
    const [result] = await pool.query(
      `INSERT INTO Emp_TimeTrack_Details (ecode_nu, projectcode_int, workdate_dt, hoursworked_dc, taskdescription_vc, status_vc, crby_vc)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [ecode_nu, projectcode_int, workdate_dt, hoursworked_dc, taskdescription_vc, status_vc, crby]
    );

    return res.status(201).json({
      success: true,
      message: 'Time track entry saved.',
      timetrack_id: result.insertId,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
