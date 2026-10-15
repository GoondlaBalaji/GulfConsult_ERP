/*
===============================================================================
Project Name : Gulf Consult ERP (GC_ERP)
Script       : Comprehensive 40-Employee Dataset with Payroll & Users
Database     : GC_ERP
Author       : Goondla Balaji
Description  : Seeds 40 structured employees (6 primary + 34 GCC engineering/HR 
               personnel), matching Sec_Users logins, and monthly salary masters.
===============================================================================
*/

USE GC_ERP;

-- =============================================================================
-- 1. ENSURE EXTRA JOB TITLES EXIST
-- =============================================================================
INSERT IGNORE INTO Gen_JobTitles (jcode_int, jtitle_vc, crby_vc) VALUES
(1, 'Senior Full Stack Architect', 'System Admin'),
(2, 'HR Manager', 'System Admin'),
(3, 'Project Manager', 'System Admin'),
(4, 'HR Coordinator', 'System Admin'),
(5, 'Site Supervisor', 'System Admin'),
(6, 'Senior Structural Engineer', 'System Admin'),
(7, 'BIM Modeler (REVIT)', 'System Admin'),
(8, 'Financial Controller', 'System Admin'),
(9, 'Senior Electrical Engineer', 'System Admin'),
(10, 'Mechanical (HVAC) Engineer', 'System Admin'),
(11, 'Quantity Surveyor (QS)', 'System Admin'),
(12, 'QA/QC Compliance Inspector', 'System Admin'),
(13, 'HSE Safety Officer', 'System Admin'),
(14, 'Document Controller', 'System Admin'),
(15, 'Chief Architect', 'System Admin');

-- =============================================================================
-- 2. INSERT 40 EMPLOYEES (6 Primary Real Roles + 34 Realistic Enterprise Staff)
-- =============================================================================
INSERT INTO Gen_Employee 
(ecode_nu, ccode_int, empname_vc, gender_vc, dob_dt, mobile_vc, email_vc, address_vc, jcode_int, ncode_int, ecode_int, doj_dt, status_vc, crby_vc) 
VALUES
-- --- 6 PRIMARY REAL EMPLOYEES ---
(1001, 1, 'Goondla Balaji', 'Male', '1995-05-12', '+965 9000 1122', 'admin@gulfconsult.com', 'Salmiya Block 10, Kuwait', 1, 2, 4, '2023-01-10', 'Active', 'System Admin'),
(1002, 1, 'Fatima Al-Mansoor', 'Female', '1992-08-24', '+965 9111 2233', 'fatima.hrms@gulfconsult.com', 'Al-Dasma Block 2, Kuwait', 2, 1, 4, '2022-03-01', 'Active', 'System Admin'),
(1003, 1, 'Tariq Rashid', 'Male', '1988-11-14', '+965 9222 3344', 'tariq.pm@gulfconsult.com', 'Hawally Block 4, Kuwait', 3, 3, 3, '2021-07-15', 'Active', 'System Admin'),
(1004, 1, 'Sarah Jenkins', 'Female', '1994-04-18', '+965 9333 4455', 'sarah.j@gulfconsult.com', 'Mahboula Block 1, Kuwait', 6, 4, 3, '2023-09-01', 'Active', 'System Admin'),
(1005, 2, 'Kharim Hussain', 'Male', '1990-09-30', '+965 9444 5566', 'kharim.h@gulfconsult.com', 'Mangaf Block 3, Kuwait', 5, 5, 2, '2024-02-12', 'Active', 'System Admin'),
(1006, 1, 'Nour El-Din', 'Male', '1993-06-15', '+965 9555 6677', 'nour.eng@gulfconsult.com', 'Sharq Block 7, Kuwait City', 7, 5, 3, '2023-05-20', 'Active', 'System Admin'),

-- --- 34 REALISTIC GCC ENTERPRISE EMPLOYEES ---
(1007, 1, 'Ahmed Al-Mutawa', 'Male', '1985-03-11', '+965 9666 7788', 'ahmed.m@gulfconsult.com', 'Yarmouk Block 3, Kuwait', 15, 1, 4, '2020-01-15', 'Active', 'System Admin'),
(1008, 1, 'David Henderson', 'Male', '1982-12-04', '+965 9777 8899', 'david.h@gulfconsult.com', 'Fintas Block 1, Kuwait', 6, 4, 5, '2019-11-01', 'Active', 'System Admin'),
(1009, 1, 'Priya Sharma', 'Female', '1996-07-22', '+965 9888 9900', 'priya.s@gulfconsult.com', 'Farwaniya Block 4, Kuwait', 7, 2, 3, '2024-01-10', 'Active', 'System Admin'),
(1010, 1, 'Marwan Haddad', 'Male', '1989-02-17', '+965 9123 4567', 'marwan.h@gulfconsult.com', 'Bneid Al-Gar, Kuwait City', 9, 3, 3, '2022-06-15', 'Active', 'System Admin'),
(1011, 2, 'Carlos Mendoza', 'Male', '1991-08-09', '+965 9234 5678', 'carlos.m@gulfconsult.com', 'Abu Halifa Block 2, Kuwait', 10, 7, 3, '2023-03-12', 'Active', 'System Admin'),
(1012, 1, 'Zaid Al-Otaibi', 'Male', '1997-10-30', '+965 9345 6789', 'zaid.o@gulfconsult.com', 'Rawda Block 2, Kuwait', 4, 1, 3, '2025-02-01', 'Active', 'System Admin'),
(1013, 1, 'Vikram Patel', 'Male', '1987-05-19', '+965 9456 7890', 'vikram.p@gulfconsult.com', 'Riggae Block 14, Kuwait', 11, 2, 3, '2021-08-20', 'Active', 'System Admin'),
(1014, 1, 'Emily Watson', 'Female', '1995-01-25', '+965 9567 8901', 'emily.w@gulfconsult.com', 'Salwa Block 11, Kuwait', 14, 4, 3, '2024-05-18', 'Active', 'System Admin'),
(1015, 1, 'Omar Farooq', 'Male', '1986-09-14', '+965 9678 9012', 'omar.f@gulfconsult.com', 'Jabriya Block 8, Kuwait', 8, 5, 4, '2020-04-10', 'Active', 'System Admin'),
(1016, 1, 'Abdullah Al-Sabah', 'Male', '1990-11-03', '+965 9789 0123', 'abdullah.s@gulfconsult.com', 'Shamiya Block 1, Kuwait', 3, 1, 4, '2022-09-01', 'Active', 'System Admin'),
(1017, 2, 'Rajesh Iyer', 'Male', '1992-04-14', '+965 9890 1234', 'rajesh.i@gulfconsult.com', 'Fahaheel Block 7, Kuwait', 12, 2, 3, '2023-11-15', 'Active', 'System Admin'),
(1018, 1, 'Maya Mansour', 'Female', '1998-03-29', '+965 9901 2345', 'maya.m@gulfconsult.com', 'Salmiya Block 4, Kuwait', 14, 6, 3, '2025-06-01', 'Active', 'System Admin'),
(1019, 1, 'Johnathan Vance', 'Male', '1984-06-08', '+965 9012 3456', 'johnathan.v@gulfconsult.com', 'Messila Beach, Kuwait', 6, 8, 4, '2019-03-15', 'Active', 'System Admin'),
(1020, 1, 'Khaled Al-Ghanim', 'Male', '1993-01-19', '+965 9123 9876', 'khaled.g@gulfconsult.com', 'Keifan Block 3, Kuwait', 13, 1, 3, '2022-10-10', 'Active', 'System Admin'),
(1021, 2, 'Sunita Rao', 'Female', '1994-08-16', '+965 9234 8765', 'sunita.r@gulfconsult.com', 'Mahboula Block 3, Kuwait', 4, 2, 3, '2023-04-05', 'Active', 'System Admin'),
(1022, 1, 'Basel Khoury', 'Male', '1988-12-21', '+965 9345 7654', 'basel.k@gulfconsult.com', 'Hawally Block 1, Kuwait', 9, 6, 3, '2021-01-20', 'Active', 'System Admin'),
(1023, 1, 'Faisal Al-Kandari', 'Male', '1991-05-07', '+965 9456 6543', 'faisal.k@gulfconsult.com', 'Adailiya Block 4, Kuwait', 3, 1, 4, '2022-04-18', 'Active', 'System Admin'),
(1024, 2, 'Ali Reda', 'Male', '1990-10-12', '+965 9567 5432', 'ali.r@gulfconsult.com', 'Khaitan Block 6, Kuwait', 5, 5, 2, '2023-08-14', 'Active', 'System Admin'),
(1025, 2, 'Roberto Santos', 'Male', '1993-07-04', '+965 9678 4321', 'roberto.s@gulfconsult.com', 'Mangaf Block 1, Kuwait', 13, 7, 2, '2024-03-22', 'Active', 'System Admin'),
(1026, 1, 'Suresh Kumar', 'Male', '1985-11-28', '+965 9789 3210', 'suresh.k@gulfconsult.com', 'Salmiya Block 12, Kuwait', 11, 2, 3, '2020-07-01', 'Active', 'System Admin'),
(1027, 1, 'Mariam Al-Hajji', 'Female', '1997-09-05', '+965 9890 2109', 'mariam.h@gulfconsult.com', 'Mishref Block 5, Kuwait', 4, 1, 3, '2024-09-15', 'Active', 'System Admin'),
(1028, 1, 'Patrick O\'Connor', 'Male', '1983-02-14', '+965 9901 1098', 'patrick.o@gulfconsult.com', 'Bida\'a Coastal Strip, Kuwait', 15, 4, 4, '2018-05-10', 'Active', 'System Admin'),
(1029, 2, 'Youssef Nabil', 'Male', '1992-06-30', '+965 9012 0987', 'youssef.n@gulfconsult.com', 'Hawally Block 9, Kuwait', 10, 5, 3, '2023-02-17', 'Active', 'System Admin'),
(1030, 1, 'Deepa Nair', 'Female', '1995-12-10', '+965 9123 1122', 'deepa.n@gulfconsult.com', 'Farwaniya Block 1, Kuwait', 7, 2, 3, '2024-06-10', 'Active', 'System Admin'),
(1031, 1, 'Hisham Al-Anezi', 'Male', '1989-08-23', '+965 9234 2233', 'hisham.a@gulfconsult.com', 'Jahra Block 2, Kuwait', 12, 1, 3, '2021-12-05', 'Active', 'System Admin'),
(1032, 1, 'George Miller', 'Male', '1986-04-02', '+965 9345 3344', 'george.m@gulfconsult.com', 'Salmiya Block 6, Kuwait', 6, 8, 4, '2020-08-20', 'Active', 'System Admin'),
(1033, 1, 'Reem Al-Bahar', 'Female', '1994-01-18', '+965 9456 4455', 'reem.b@gulfconsult.com', 'Nuzha Block 3, Kuwait', 8, 1, 4, '2023-07-01', 'Active', 'System Admin'),
(1034, 1, 'Ananya Deshmukh', 'Female', '1996-05-15', '+965 9567 5566', 'ananya.d@gulfconsult.com', 'Riggae Block 2, Kuwait', 14, 2, 3, '2024-04-12', 'Active', 'System Admin'),
(1035, 1, 'Latifa Al-Rashid', 'Female', '1998-11-20', '+965 9678 6677', 'latifa.r@gulfconsult.com', 'Bayan Block 8, Kuwait', 2, 1, 3, '2025-01-15', 'Active', 'System Admin'),
(1036, 2, 'Karim Fawzi', 'Male', '1991-03-08', '+965 9789 7788', 'karim.f@gulfconsult.com', 'Mangaf Block 4, Kuwait', 5, 5, 2, '2023-10-01', 'Active', 'System Admin'),
(1037, 1, 'Mark Reynolds', 'Male', '1981-07-29', '+965 9890 8899', 'mark.r@gulfconsult.com', 'Egaila Block 1, Kuwait', 3, 4, 4, '2019-06-15', 'Active', 'System Admin'),
(1038, 1, 'Noor Al-Duaij', 'Female', '1995-10-05', '+965 9901 9900', 'noor.d@gulfconsult.com', 'Surra Block 6, Kuwait', 7, 1, 3, '2024-02-01', 'Active', 'System Admin'),
(1039, 2, 'Sneha Kulkarni', 'Female', '1993-02-14', '+965 9012 8877', 'sneha.k@gulfconsult.com', 'Abu Halifa Block 1, Kuwait', 11, 2, 3, '2023-09-18', 'Active', 'System Admin'),
(1040, 1, 'Hamad Al-Enezi', 'Male', '1990-06-25', '+965 9123 7766', 'hamad.e@gulfconsult.com', 'Sabah Al-Salem Block 1, Kuwait', 12, 1, 3, '2022-05-10', 'Active', 'System Admin')
ON DUPLICATE KEY UPDATE 
    empname_vc = VALUES(empname_vc),
    email_vc = VALUES(email_vc),
    status_vc = VALUES(status_vc);

-- =============================================================================
-- 3. INSERT MATCHING USERS INTO Sec_Users
-- =============================================================================
INSERT INTO Sec_Users (ecode_nu, username_vc, password_vc, role_vc, active_int, crby_vc) VALUES
(1001, 'admin', 'admin123', 'System Administrator', 1, 'System Admin'),
(1002, 'hr_manager', 'hr123', 'HR Manager', 1, 'System Admin'),
(1003, 'pm_expert', 'pm123', 'Project Manager', 1, 'System Admin'),
(1004, 'sarah_j', 'gc123456', 'Employee', 1, 'System Admin'),
(1005, 'kharim_h', 'gc123456', 'Employee', 1, 'System Admin'),
(1006, 'nour_din', 'gc123456', 'Employee', 1, 'System Admin'),
(1007, 'ahmed_m', 'gc123456', 'Project Manager', 1, 'System Admin'),
(1008, 'david_h', 'gc123456', 'Employee', 1, 'System Admin'),
(1009, 'priya_s', 'gc123456', 'Employee', 1, 'System Admin'),
(1010, 'marwan_h', 'gc123456', 'Employee', 1, 'System Admin'),
(1011, 'carlos_m', 'gc123456', 'Employee', 1, 'System Admin'),
(1012, 'zaid_o', 'gc123456', 'Employee', 1, 'System Admin'),
(1013, 'vikram_p', 'gc123456', 'Employee', 1, 'System Admin'),
(1014, 'emily_w', 'gc123456', 'Employee', 1, 'System Admin'),
(1015, 'omar_f', 'gc123456', 'HR Manager', 1, 'System Admin'),
(1016, 'abdullah_s', 'gc123456', 'Project Manager', 1, 'System Admin')
ON DUPLICATE KEY UPDATE 
    password_vc = VALUES(password_vc),
    role_vc = VALUES(role_vc);

-- =============================================================================
-- 4. INSERT REALISTIC MONTHLY SALARY RECORDS (OCTOBER 2026)
-- =============================================================================
INSERT INTO emp_salary_master 
(ecode_nu, basicsalary_dc, grosssalary_dc, netsalary_dc, salarymonth_int, salaryyear_int, status_vc, crby_vc) 
VALUES
(1001, 3200.00, 4950.00, 4600.00, 10, 2026, 'Processed', 'Payroll Admin'),
(1002, 2800.00, 4350.00, 4000.00, 10, 2026, 'Processed', 'Payroll Admin'),
(1003, 2900.00, 4450.00, 4100.00, 10, 2026, 'Processed', 'Payroll Admin'),
(1004, 2500.00, 3950.00, 3600.00, 10, 2026, 'Processed', 'Payroll Admin'),
(1005, 1800.00, 3150.00, 2800.00, 10, 2026, 'Processed', 'Payroll Admin'),
(1006, 2200.00, 3550.00, 3200.00, 10, 2026, 'Processed', 'Payroll Admin'),
(1007, 4500.00, 6250.00, 5900.00, 10, 2026, 'Processed', 'Payroll Admin'),
(1008, 3800.00, 5550.00, 5200.00, 10, 2026, 'Processed', 'Payroll Admin'),
(1009, 1900.00, 3250.00, 2900.00, 10, 2026, 'Processed', 'Payroll Admin'),
(1010, 2600.00, 4050.00, 3700.00, 10, 2026, 'Processed', 'Payroll Admin'),
(1011, 2400.00, 3850.00, 3500.00, 10, 2026, 'Processed', 'Payroll Admin'),
(1012, 1700.00, 3050.00, 2700.00, 10, 2026, 'Processed', 'Payroll Admin'),
(1013, 2300.00, 3750.00, 3400.00, 10, 2026, 'Processed', 'Payroll Admin'),
(1014, 1600.00, 2950.00, 2600.00, 10, 2026, 'Processed', 'Payroll Admin'),
(1015, 3400.00, 5150.00, 4800.00, 10, 2026, 'Processed', 'Payroll Admin'),
(1016, 3100.00, 4850.00, 4500.00, 10, 2026, 'Processed', 'Payroll Admin')
ON DUPLICATE KEY UPDATE 
    grosssalary_dc = VALUES(grosssalary_dc),
    netsalary_dc = VALUES(netsalary_dc);

SELECT '40 Employee Dataset successfully installed in GC_ERP!' AS Status, COUNT(*) AS TotalEmployees FROM Gen_Employee;
