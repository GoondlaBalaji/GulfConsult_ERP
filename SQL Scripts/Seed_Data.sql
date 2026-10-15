/*
===============================================================================
Project Name : Gulf Consult ERP (GC_ERP)
Script       : Seed Data & Initial Masters
Database     : GC_ERP
Author       : Goondla Balaji
===============================================================================
*/

USE GC_ERP;

-- 1. COMPANIES
INSERT INTO Gen_Company (cname_vc, address_vc, crby_vc) VALUES
('Gulf Consult Engineering & Planning', 'Al-Murqab, Block 3, Al-Sour Street, Kuwait City', 'System Admin'),
('Gulf Maritime Contracting Ltd', 'Shuwaikh Industrial Area, Port Street, Kuwait', 'System Admin');

-- 2. JOB TITLES
INSERT INTO Gen_JobTitles (jtitle_vc, crby_vc) VALUES
('Senior Full Stack Architect', 'System Admin'),
('HR Manager', 'System Admin'),
('Project Manager', 'System Admin'),
('HR Coordinator', 'System Admin'),
('Site Supervisor', 'System Admin'),
('Senior Structural Engineer', 'System Admin'),
('BIM Modeler (REVIT)', 'System Admin'),
('Financial Controller', 'System Admin');

-- 3. NATIONALITIES
INSERT INTO gen_nationality (nname_vc, crby_vc) VALUES
('Kuwaiti', 'System Admin'),
('Indian', 'System Admin'),
('Jordanian', 'System Admin'),
('British', 'System Admin'),
('Egyptian', 'System Admin'),
('Lebanese', 'System Admin'),
('Filipino', 'System Admin'),
('American', 'System Admin');

-- 4. EDUCATION
INSERT INTO Gen_Education (education_vc, crby_vc) VALUES
('High School Diploma', 'System Admin'),
('Technical Diploma', 'System Admin'),
('Bachelor of Science / Engineering', 'System Admin'),
('Master of Business Administration (MBA)', 'System Admin'),
('Doctor of Philosophy (Ph.D.)', 'System Admin');

-- 5. DOCUMENT TYPES
INSERT INTO Gen_DocTypes (doctypename_vc, crby_vc) VALUES
('Civil ID Copy', 'System Admin'),
('Passport Copy', 'System Admin'),
('Work Permit (Visa 18)', 'System Admin'),
('Graduation Certificate', 'System Admin'),
('Paci Address Card', 'System Admin'),
('Driving License', 'System Admin');

-- 6. LEAVE TYPES
INSERT INTO Gen_LeaveTypes (leavename_vc, noofdays_int, crby_vc) VALUES
('Annual Leave', 30, 'System Admin'),
('Sick Leave', 15, 'System Admin'),
('Casual Leave', 7, 'System Admin'),
('Bereavement Leave', 5, 'System Admin'),
('Maternity Leave', 70, 'System Admin'),
('Hajj Pilgrimage Leave', 21, 'System Admin');

-- 7. ALLOWANCES
INSERT INTO Gen_Allowance_List (allowancename_vc, allowanceamount_dc, crby_vc) VALUES
('Housing Allowance', 1200.00, 'System Admin'),
('Transport Allowance', 400.00, 'System Admin'),
('Mobile / Communication Allowance', 150.00, 'System Admin'),
('Site Hardship Allowance', 500.00, 'System Admin'),
('Performance Bonus', 750.00, 'System Admin');

-- 8. DEDUCTIONS
INSERT INTO Gen_Deductions_List (deductionname_vc, deductionamount_dc, crby_vc) VALUES
('Social Insurance (PIFSS)', 350.00, 'System Admin'),
('Staff Loan Repayment', 200.00, 'System Admin'),
('Health Care Premium', 100.00, 'System Admin'),
('Company Vehicle Fine / Deduction', 50.00, 'System Admin');

-- 9. PROJECTS
INSERT INTO Gen_Projects (projectname_vc, clientname_vc, startdate_dt, enddate_dt, status_vc, crby_vc) VALUES
('Gulf Maritime Complex Phase 2', 'Kuwait Port Authority', '2026-01-15', '2027-06-30', 'Active', 'System Admin'),
('Al-Farwaniya Infrastructure Upgrade', 'Ministry of Public Works', '2026-03-01', '2026-12-31', 'Active', 'System Admin'),
('Sabah Al-Salem Commercial Tower', 'Tamdeen Group', '2025-08-10', '2026-10-15', 'Reviewing', 'System Admin');

-- 10. EMPLOYEES
INSERT INTO Gen_Employee (ccode_int, empname_vc, gender_vc, dob_dt, mobile_vc, email_vc, address_vc, jcode_int, ncode_int, ecode_int, doj_dt, status_vc, crby_vc) VALUES
(1, 'Goondla Balaji', 'Male', '1995-05-12', '+965 9000 1122', 'admin@gulfconsult.com', 'Salmiya Block 10, Kuwait', 1, 2, 3, '2023-01-10', 'Active', 'System Admin'),
(1, 'Fatima Al-Mansoor', 'Female', '1992-08-24', '+965 9111 2233', 'fatima.hrms@gulfconsult.com', 'Al-Dasma Block 2, Kuwait', 2, 1, 4, '2022-03-01', 'Active', 'System Admin'),
(1, 'Tariq Rashid', 'Male', '1988-11-14', '+965 9222 3344', 'tariq.pm@gulfconsult.com', 'Hawally Block 4, Kuwait', 3, 3, 3, '2021-07-15', 'Active', 'System Admin'),
(1, 'Sarah Jenkins', 'Female', '1996-04-18', '+965 9333 4455', 'sarah.j@gulfconsult.com', 'Mahboula Block 1, Kuwait', 4, 4, 3, '2026-07-25', 'Onboarding', 'System Admin'),
(2, 'Kharim Hussain', 'Male', '1990-09-30', '+965 9444 5566', 'kharim.h@gulfconsult.com', 'Mangaf Block 3, Kuwait', 5, 5, 2, '2024-02-12', 'Active', 'System Admin');

-- 11. USERS
INSERT INTO Sec_Users (ecode_nu, username_vc, password_vc, role_vc, active_int, crby_vc) VALUES
(1, 'admin', 'admin123', 'System Administrator', 1, 'System Admin'),
(2, 'hr_manager', 'hr123', 'HR Manager', 1, 'System Admin'),
(3, 'pm_expert', 'pm123', 'Project Manager', 1, 'System Admin');
