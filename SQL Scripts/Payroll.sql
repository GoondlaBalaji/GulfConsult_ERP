/*
===============================================================================
Project Name : Gulf Consult ERP (GC_ERP)
Module       : Payroll Module
Database     : GC_ERP
Author       : Goondla Balaji
Version      : 1.0
Description  : Creates all Payroll master and transaction tables.
===============================================================================
*/

CREATE DATABASE IF NOT EXISTS GC_ERP;
USE GC_ERP;

-- =============================================================================
-- 1. ALLOWANCE MASTER
-- =============================================================================
CREATE TABLE IF NOT EXISTS Gen_Allowance_List
(
    allowancecode_int      INT AUTO_INCREMENT,
    allowancename_vc       VARCHAR(100) NOT NULL,
    allowanceamount_dc     DECIMAL(10,2) NOT NULL,
    deleted_int            INT DEFAULT 0,

    crby_vc                VARCHAR(50) NOT NULL,
    crdate_dt              DATETIME DEFAULT CURRENT_TIMESTAMP,

    modby_vc               VARCHAR(50),
    moddate_dt             DATETIME DEFAULT CURRENT_TIMESTAMP
                           ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (allowancecode_int),
    UNIQUE (allowancename_vc)
);

-- =============================================================================
-- 2. DEDUCTION MASTER
-- =============================================================================
CREATE TABLE IF NOT EXISTS Gen_Deductions_List
(
    deductioncode_int      INT AUTO_INCREMENT,
    deductionname_vc       VARCHAR(100) NOT NULL,
    deductionamount_dc     DECIMAL(10,2) NOT NULL,
    deleted_int            INT DEFAULT 0,

    crby_vc                VARCHAR(50) NOT NULL,
    crdate_dt              DATETIME DEFAULT CURRENT_TIMESTAMP,

    modby_vc               VARCHAR(50),
    moddate_dt             DATETIME DEFAULT CURRENT_TIMESTAMP
                           ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (deductioncode_int),
    UNIQUE (deductionname_vc)
);

-- =============================================================================
-- 3. EMPLOYEE SALARY MASTER
-- =============================================================================
CREATE TABLE IF NOT EXISTS emp_salary_master
(
    salarymaster_id        INT AUTO_INCREMENT,
    ecode_nu               BIGINT NOT NULL,
    basicsalary_dc         DECIMAL(12,2) NOT NULL,
    grosssalary_dc         DECIMAL(12,2),
    netsalary_dc           DECIMAL(12,2),
    salarymonth_int        INT NOT NULL,
    salaryyear_int         INT NOT NULL,
    status_vc              VARCHAR(30),

    crby_vc                VARCHAR(50) NOT NULL,
    crdate_dt              DATETIME DEFAULT CURRENT_TIMESTAMP,

    modby_vc               VARCHAR(50),
    moddate_dt             DATETIME DEFAULT CURRENT_TIMESTAMP
                           ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (salarymaster_id),
    FOREIGN KEY (ecode_nu) REFERENCES Gen_Employee(ecode_nu)
);

-- =============================================================================
-- 4. EMPLOYEE SALARY DETAILS
-- =============================================================================
CREATE TABLE IF NOT EXISTS emp_salary_details
(
    salarydetail_id        INT AUTO_INCREMENT,
    salarymaster_id        INT NOT NULL,
    allowancecode_int      INT,
    deductioncode_int      INT,
    allowanceamount_dc     DECIMAL(10,2) DEFAULT 0,
    deductionamount_dc     DECIMAL(10,2) DEFAULT 0,
    remarks_vc             VARCHAR(255),

    PRIMARY KEY (salarydetail_id),
    FOREIGN KEY (salarymaster_id) REFERENCES emp_salary_master(salarymaster_id),
    FOREIGN KEY (allowancecode_int) REFERENCES Gen_Allowance_List(allowancecode_int),
    FOREIGN KEY (deductioncode_int) REFERENCES Gen_Deductions_List(deductioncode_int)
);
